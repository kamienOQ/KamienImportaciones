import { collection, getDocs, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { onSetProducts, onSetProductsByCategorySelect } from "./productsSlice";

export const onStartGetProducts = () => {
    return async (dispatch) => {

        const collectionRef = collection(FirebaseDB, `/products`);  
        let q = query( collectionRef);
        const querySnapshot = await getDocs(q);

        const product = querySnapshot.docs.map((doc) => {
            return doc.data();
        });
        dispatch(onSetProducts(product));
      
    }
}

export const onGetProductsByCategory = ( categoryId ) => {
    return async (dispatch) => {

        const queryCollection = collection(FirebaseDB, '/products'); 
        if (categoryId) {
        const queryFilter = query(queryCollection, where('category', '==', categoryId));
        getDocs(queryFilter)
            .then( res => dispatch(onSetProductsByCategorySelect(res.docs.map( product => ({ id: product .id, ...product  .data() })))));
        } else {
        getDocs(queryCollection)
            .then( res => dispatch(onSetProductsByCategorySelect(res.docs.map( product => ({ id: product .id, ...product  .data() })))));
        };

    }
}