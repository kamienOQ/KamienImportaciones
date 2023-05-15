import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import {  onCleanAttributes, onSetAttributes, onCleanProducts, onGetAttributes, onGetCategory} from ".";
import { onSetProducts } from '../products/productsSlice'


export const onStartGetAttributesByCategory = () => {
  return async (dispatch, getState) => {
    const {categorySelected} = getState().categories;
    console.log(categorySelected);
    dispatch(onCleanAttributes());
    const q = query(
      collection(FirebaseDB, "/attributes"),
      where("categoriesRelated", "array-contains", categorySelected),
      where("active", "==", true));
    const querySnapshot = await getDocs(q);

    const attributes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log(data)
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
    const {attributesSelected} = getState().filter;//Traer attributes del storage
    const {category} = getState().filter;//Traer category del storage
    dispatch(onCleanProducts());
    const promises = attributesSelected.map((attribute) => {
      const q = query(
        collection(FirebaseDB, "products"),
        where("relatedAttributes", "array-contains", attribute),
        where("relatedCategories", "==", category),
        where("active", "==", true)
      );
      return getDocs(q);
    });

    const product = promises.docs.map((doc, index) => {
        return { ...doc.data(), id: index };
      });
    dispatch(onSetProducts(product));
    console.log(product)

    // const snapshots = await Promise.all(promises);
    // const products = snapshots.flatMap((snapshot) => {
    //   return snapshot.docs.map((doc) => doc.data());
    // });
    // console.log(products)
    // dispatch(onSetProducts(products));
  };
};

export const onStartGetProductsByGender = (preValue) => {
  return async (dispatch,getState) => {
    const {category} = getState().filter;//Traer category del storage
    // dispatch(onCleanProducts());
    
    const q = query(
      collection(FirebaseDB, "products"),
      where("relatedAttributes", "array-contains", preValue),
      where("relatedCategories", "==", category),
      where("active", "==", true)
    );
    
    const querySnapshot = await getDocs(q);

    const product = querySnapshot.docs.map((doc, index) => {
      return { ...doc.data(), id: index };
    });
    dispatch(onSetProducts(product));
    console.log(product)

    // const products = promises.docs.map((doc) => doc.data())
    // console.log(products)
  };
};