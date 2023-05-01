import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, where } from "firebase/firestore/lite";

import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import {  onCleanAttributes, onSetAttributes, onSetNumberAttributes} from ".";


export const onStartGetAttributesByCategory = (categoryName) => {
  return async (dispatch) => {
    dispatch(onCleanAttributes());
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

    //dispatch(onSetAttributes(attributes));
  };
};






export const onStartGetAttributes = (page = 0, size = 5) => {
  return async (dispatch) => {
    dispatch(onCleanAttributes());

    const collectionRef = collection(FirebaseDB, `/attributes`);
    let q;

    if (page === 0) {
      q = query( collectionRef, orderBy("date", "desc"), limit(size) );
    } else {
      const lastVisibleDoc = query( collectionRef,  orderBy("date", "desc"), limit(page * size) );
      const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
      const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
      q = query( collectionRef,  orderBy("date", "desc"), startAfter(lastVisible), limit(size) );
    }

    const querySnapshot = await getDocs(q);

    const newAttribute = querySnapshot.docs.map((doc, index) => {
      return { id: index + 1 + page * size, ...doc.data() };
    });
    dispatch(onSetAttributes(newAttribute));
    
  }
}



export const onStartFiltersAttributes = (page = 0, size = 5, preValue) => {
  return async (dispatch, getState) => {

    const { filter } = getState().attributes;
    if(!!filter){
      const { field, value } = filter;
      dispatch(onCleanAttributes());
      const collectionRef = collection(FirebaseDB, `/attributes`);
      let q, undersized = false;
      if(field?.toLowerCase().includes('name')){
        if(value==='asc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("attributeNameLowerCase", "asc"), limit(size) );
            dispatch(onStartNumberAttributes());
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("attributeNameLowerCase", "asc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("attributeNameLowerCase", "asc"), startAfter(lastVisible), limit(size) );
          }
        }if(value==='desc'){
          if (page === 0) {
            q = query( collectionRef, orderBy("attributeNameLowerCase", "desc"), limit(size) );
            dispatch(onStartNumberAttributes());
          } else {
            const lastVisibleDoc = query( collectionRef,  orderBy("attributeNameLowerCase", "desc"), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  orderBy("attributeNameLowerCase", "desc"), startAfter(lastVisible), limit(size) );
          }
        }if(value!=='asc' && value !== 'desc'){
          const formattedName = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if(preValue !== value){
            q = query( collectionRef, where('attributeNameLowerCase', '>=', formattedName), where('attributeNameLowerCase', '<', formattedName + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            undersized = (querySnapshot.size <= size) ? true : false;
            dispatch(onSetNumberAttributes(querySnapshot.size));
          } if (page === 0 || undersized) {
            q = query( collectionRef, where('attributeNameLowerCase', '>=', formattedName), where('attributeNameLowerCase', '<', formattedName + '\uf8ff'), limit(size) );
          } else {
            const lastVisibleDoc = query( collectionRef,  where('attributeNameLowerCase', '>=', formattedName), where('attributeNameLowerCase', '<', formattedName + '\uf8ff'), limit(page * size) );
            const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
            const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
            q = query( collectionRef,  where('attributeNameLowerCase', '>=', formattedName), where('attributeNameLowerCase', '<', formattedName + '\uf8ff'), startAfter(lastVisible), limit(size) );
          }
        }
      }
      if(field?.toLowerCase().includes('date')){
        const dateObject = new Date(value)
        if(preValue !== value){
          q = query( collectionRef, where("date", ">=", dateObject.getTime()));
          const querySnapshot = await getDocs(q);
          undersized = (querySnapshot.size <= size) ? true : false;
          dispatch(onSetNumberAttributes(querySnapshot.size));
        } if (page === 0 || undersized) {
          q = query( collectionRef, where("date", ">=", dateObject.getTime()), limit(size) );
        } else {
          const lastVisibleDoc = query( collectionRef,  where("date", ">=", dateObject.getTime()), limit(page * size) );
          const lastVisibleDocSnapshot = await getDocs(lastVisibleDoc);
          const lastVisible = lastVisibleDocSnapshot.docs[lastVisibleDocSnapshot.docs.length-1];
          q = query( collectionRef,  where("date", ">=", dateObject.getTime()), startAfter(lastVisible), limit(size) );
        }
      }

      const querySnapshot = await getDocs(q);
      const newAttribute = querySnapshot.docs.map((doc, index) => {
        return { id: index + 1 + page * size, ...doc.data() };
      });
  
      dispatch(onSetAttributes(newAttribute));
    }
  }
}

