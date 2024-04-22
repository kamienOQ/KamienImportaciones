import { collection, getDocs, query } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { onSetData } from "./aboutSlice";

export const onStartGetAbout = () => {
  return async (dispatch) => {
    const collectionRef = collection(FirebaseDB, `/about`);
    let q = query(collectionRef);

    try {
      const querySnapshot = await getDocs(q);

      const newAttribute = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      dispatch(onSetData(newAttribute));
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };
};
