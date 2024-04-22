import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { onSetProducts, onSetProductsByCategorySelect } from "./productsSlice";

export const onStartGetProducts = (categorySelected) => {
  return async (dispatch) => {
    try {
      const collectionRef = collection(FirebaseDB, `/products`);
      let q = query(
        collectionRef,
        where("active", "==", true),
        where("relatedCategories", "==", categorySelected)
      );
      const querySnapshot = await getDocs(q);

      const product = querySnapshot.docs.map((doc) => doc.data());
      dispatch(onSetProducts(product));
    } catch (error) {
      console.error("Error in onStartGetProducts:", error);
    }
  };
};

export const onGetProductsByCategory = () => {
  return async (dispatch, getState) => {
    try {
      const { categorySelected } = getState().categories;

      const collectionRef = collection(FirebaseDB, "/products");
      let q;

      if (categorySelected) {
        q = query(
          collectionRef,
          where("active", "==", true),
          where("relatedCategories", "==", categorySelected)
        );
      } else {
        q = collectionRef;
      }
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const products = querySnapshot.docs.map((product) => ({
          id: product.id,
          ...product.data(),
        }));
        dispatch(onSetProductsByCategorySelect(products));
      });
    } catch (error) {
      console.error("Error in onGetProductsByCategory:", error);
      // Manejar el error, posiblemente actualizando el estado con un mensaje de error
      dispatch(onAddErrorMessage("Error fetching products"));
    }

    // Devuelve la función de limpieza para limpiar el listener cuando el componente se desmonta
    return () => {
      unsubscribe();
    };
  };
};
