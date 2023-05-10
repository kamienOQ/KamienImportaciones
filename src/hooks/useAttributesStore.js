import { useDispatch } from "react-redux";
import {onStartGetAttributesByCategory,onStartGetProductsByAttributes} from "../store/filters";

export const useAttributesStore = () => {
    const dispatch = useDispatch();

    //*Thunks
    const startGetAttributesByCategory = () => {
        dispatch( onStartGetAttributesByCategory() );
    }
    const startGetProductsByAttributes = () => {
        dispatch( onStartGetProductsByAttributes() );
    }

    return {
        //*Métodos
        startGetAttributesByCategory,
        startGetProductsByAttributes
    }
}

