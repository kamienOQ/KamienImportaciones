import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { onSetProducts, onSetProductsByCategorySelect } from "./productsSlice";

export const onStartGetProducts = (categorySelected) => {
    return async (dispatch) => {

        const collectionRef = collection(FirebaseDB, `/products`);  
        console.log(categorySelected)
        let q = query( collectionRef, where('active', '==', true), where('relatedCategories', '==', categorySelected) );
        const querySnapshot = await getDocs(q);

        const product = querySnapshot.docs.map((doc) => {
            return doc.data();
        });
        dispatch(onSetProducts(product));
      
    }
}

export const onGetProductsByCategory = () => {
    return async (dispatch, getState) => {

        const {categorySelected} = getState().categories;

        const queryCollection = collection(FirebaseDB, '/products'); 
        if (categorySelected) {
            const queryFilter = query(queryCollection, where('active', '==', true), where('relatedCategories', '==', categorySelected));
            getDocs(queryFilter)
            .then( res => dispatch(onSetProductsByCategorySelect(res.docs.map( product => ({ id: product .id, ...product.data() })))));
        } else {
        getDocs(queryCollection)
            .then( res => dispatch(onSetProductsByCategorySelect(res.docs.map( product => ({ id: product .id, ...product.data() })))));
        };
        dispatch(onSetProductsByCategorySelect(queryCollection))
    }
}