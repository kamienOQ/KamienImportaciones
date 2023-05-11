import { useDispatch, useSelector } from "react-redux";
import { onGetProductsByCategory, onStartGetProducts } from "../store/products/thunks";
import { onSetProductSelected } from "../store/products/productsSlice";

export const useProductsStore = () => {
    const dispatch = useDispatch();

    const { 
        products,
        productSelected,
    } = useSelector( state => state.products );

    //*Slice
    const setProductSelected = (productName) => {
        dispatch( onSetProductSelected(productName) );
    }

    //*Thunks
    const startGetProducts = (categorySelected) => {
        dispatch( onStartGetProducts(categorySelected) );
    }

    const getProductsByCategory = () => {
        dispatch( onGetProductsByCategory() );
    }

    return{
        //*Propiedades
        products,
        productSelected,
        
        //*Métodos
        startGetProducts,
        setProductSelected,
        getProductsByCategory,
    }

}