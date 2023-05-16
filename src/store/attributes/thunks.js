import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import {  onCleanAttributes, onSetAttributes } from ".";
import { onChargeProduct, onSetProducts, onCleanProducts } from '../products/productsSlice'


export const onStartGetAttributesByCategory = () => {
  return async (dispatch, getState) => {
    const {categorySelected} = getState().categories;
    dispatch(onCleanAttributes());
    const q = query(
      collection(FirebaseDB, "/attributes"),
      where("categoriesRelated", "array-contains", categorySelected),
      where("active", "==", true));
    const querySnapshot = await getDocs(q);

    const attributes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        attributeName: data.attributeName,
        attributesRelated: data.attributesRelated,
      };
    });

    dispatch(onSetAttributes(attributes));
  };
};

export const onStartGetProductsByAttributes = () => {
  return async (dispatch,getState) => {
    const {attributesSelected} = getState().filter;//Traer attributes del storage
    const {categorySelected} = getState().categories;//Traer category del storage
    
    const q = query(
      collection(FirebaseDB, "products"),
      where("relatedCategories", "==", categorySelected),
      where("active", "==", true)
    );
    const querySnapshot = await getDocs(q);
    
    const categoryProducts = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    dispatch(onCleanProducts());
    attributesSelected.forEach(atribute => {
      let products = categoryProducts.filter((filter) => filter.relatedListAttributes.some((obj) => obj.feature === atribute));
      products.forEach(product => {
        dispatch(onChargeProduct(product));
      });
      
    });
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