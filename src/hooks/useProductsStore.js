import { useDispatch, useSelector } from "react-redux";
import { onGetProductsByCategory, onStartGetProducts } from "../store/products/thunks";

export const useProductsStore = () => {
    const dispatch = useDispatch();

    const { 
        products
    } = useSelector( state => state.products );

    //*Slice

    //*Thunks
    const startGetProducts = () => {
        dispatch( onStartGetProducts() );
    }

    const getProductsByCategory = () => {
        dispatch( onGetProductsByCategory() );
    }

    return{
        //*Propiedades
        products,
        
        //*Métodos
        startGetProducts,
        getProductsByCategory,
    }

}