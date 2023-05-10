import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import {  onCleanAttributes, onSetAttributes, onCleanProducts,onSetProducts,onGetAttributes, onGetCategory} from ".";



export const onStartGetAttributesByCategory = () => {
  return async (dispatch,getState) => {
    const {category} = getState().filter;
    console.log(category);
    dispatch(onCleanAttributes());
    const q = query(
      collection(FirebaseDB, "/attributes"),
      where("categoriesRelated", "array-contains", category),
      where("active", "==", true));
    const querySnapshot = await getDocs(q);

    const attributes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        attributeName: data.attributeName,
        attributesRelated: data.attributesRelated,
      };
    });
    console.log(attributes)

    dispatch(onSetAttributes(attributes));
  };
};

export const onStartGetProductsByAttributes = () => {
  return async (dispatch,getState) => {
    const {attributes} = getState().filter;//Traer attributes del storage
    const {category} = getState().filter;//Traer category del storage
    dispatch(onCleanProducts());
    const promises = attributes.map((attribute) => {
      const q = query(
        collection(FirebaseDB, "products"),
        where("relatedAttributes", "array-contains", attribute),
        where("relatedCategories", "==", category),
        where("active", "==", true)
      );
      return getDocs(q);
    });

    const snapshots = await Promise.all(promises);
    const products = snapshots.flatMap((snapshot) => {
      return snapshot.docs.map((doc) => doc.data());
    });
    console.log(products)
    dispatch(onSetProducts(products));
  };
};
