import { collection, getDocs, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { onSetCategories } from "./categoriesSlice";

export const onStartGetCategories = () => {
    return async (dispatch) => {

        const collectionRef = collection(FirebaseDB, `/categories`);  
        let q = query( collectionRef);
        const querySnapshot = await getDocs(q);

        const category = querySnapshot.docs.map((doc) => {
            return doc.data();
        });
        dispatch(onSetCategories(category));
      
    }
  }