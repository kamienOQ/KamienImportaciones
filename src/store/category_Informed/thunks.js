import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { categoryInformed } from "./categoryInformed";

export const onStartGetCategoriesInformedNotices = () => {
  return async (dispatch) => {
    try {
      const collectionRef = collection(FirebaseDB, `/categoryInformedNotices`);
      let q = query(collectionRef, where("active", "==", true));
      const querySnapshot = await getDocs(q);

      const category = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      dispatch(categoryInformed(category));
    } catch (error) {
      console.log("Error in onStartGetCategoriesInformedNotices:", error);
    }
  };
};
