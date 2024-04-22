import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { onSetActiveProduct } from "./cartSlice";

export const onStartGetProductByDate = (date) => {
  return async (dispatch) => {
    try {
      const collectionRef = collection(FirebaseDB, `/products`);
      let q = query(collectionRef, where("date", "==", date));
      const querySnapshot = await getDocs(q);

      const product = querySnapshot.docs.map((doc) => {
        return doc.data();
      });

      dispatch(onSetActiveProduct(product[0]));
    } catch (error) {
        console.log("Error in onStartGetProductByDate:", error);
    }
  };
};
