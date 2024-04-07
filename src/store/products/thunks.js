import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { onSetProducts, onSetProductsByCategorySelect } from "./productsSlice";

export const onStartGetProducts = (categorySelected) => {
  return async (dispatch) => {
    const collectionRef = collection(FirebaseDB, `/products`);
    let q = query(
      collectionRef,
      where("active", "==", true),
      where("relatedCategories", "==", categorySelected)
    );
    const querySnapshot = await getDocs(q);

    const product = querySnapshot.docs.map((doc) => doc.data());
    dispatch(onSetProducts(product));
  };
};

export const onGetProductsByCategory = () => {
  return async (dispatch, getState) => {
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

    // Devuelve la función de limpieza para limpiar el listener cuando el componente se desmonta
    return () => {
      unsubscribe();
    };
  };
};
