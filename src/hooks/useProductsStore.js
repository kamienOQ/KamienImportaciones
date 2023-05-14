import { useDispatch, useSelector } from "react-redux";
import { onGetProductsByCategory, onStartGetProducts } from "../store/products/thunks";
import { onAddErrorMessage, onAddSuccessMessage, onSetActiveProduct, 
    onSetProductSelected } from "../store/products/productsSlice";

export const useProductsStore = () => {
    const dispatch = useDispatch();

    const { 
        products,
        productSelected,
        message,
        activeProduct,
    } = useSelector( state => state.products );

    //*Slice
    const setProductSelected = (productName) => {
        dispatch( onSetProductSelected(productName) );
    }

    const setActiveProduct = ( product ) => {
        dispatch( onSetActiveProduct( product ) );
    }

    const addErrorMessage = ( message ) => {
        dispatch( onAddErrorMessage( message ) );
    }   

    const addSuccessMessage = ( message ) => {
        dispatch( onAddSuccessMessage( message ) );
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
        message,
        activeProduct,
        
        //*Métodos
        startGetProducts,
        setProductSelected,
        setActiveProduct,
        getProductsByCategory,
        addErrorMessage,
        addSuccessMessage,
    }

}