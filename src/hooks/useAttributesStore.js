import { useDispatch } from "react-redux";
import {onStartGetAttributesByCategory,onStartGetProductsByAttributes} from "../store/attributes/";

export const useAttributesStore = () => {
    const dispatch = useDispatch();

    //*Thunks
    const startGetAttributesByCategory = (categoryName) => {
        dispatch( onStartGetAttributesByCategory(categoryName) );
    }
    const startGetProductsByAttributes = (attributes) => {
        dispatch( onStartGetProductsByAttributes(attributes) );
    }

    return {
        //*Métodos
        startGetAttributesByCategory,
        startGetProductsByAttributes
    }
}

//export { startGetAttributesByCategory };
