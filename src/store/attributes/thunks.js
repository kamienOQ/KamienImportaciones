import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";

import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import {  onCleanAttributes, onSetAttributes, onCleanProducts,onSetProducts,onGetAttributes, onGetCategory} from ".";



export const onStartGetAttributesByCategory = () => {
  return async (dispatch) => {
    const categoryName = dispatch(onGetCategory());//Traer category del storage
    console.log(categoryName);
    //dispatch(onCleanAttributes());
    const collectionRef = collection(FirebaseDB, "/attributes");
    const q = query(collectionRef, where("categoriesRelated", "array-contains", categoryName));
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
  return async (dispatch) => {
    const attributesList = dispatch(onGetAttributes());//Traer attributes del storage
    const category = dispatch(onGetCategory());//Traer category del storage
    //dispatch(onCleanProducts());

    const promises = attributesList.map((attribute) => {
      const q = query(
        collection(FirebaseDB, "products"),
        where("relatedAttributes", "array-contains", attribute),
        where("relatedCategories", "array-contains", category)
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
