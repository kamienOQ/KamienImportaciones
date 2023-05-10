import { useDispatch } from "react-redux";
import {onStartGetAttributesByCategory,onStartGetProductsByAttributes,onStartGetProductsByGender} from "../store/attributes";

export const useAttributesStore = () => {
    const dispatch = useDispatch();

    //*Thunks
    const startGetAttributesByCategory = () => {
        dispatch( onStartGetAttributesByCategory() );
    }
    const startGetProductsByAttributes = () => {
        dispatch( onStartGetProductsByAttributes() );
    }

    const startGetProductsByGender = (preValue) => {
        dispatch( onStartGetProductsByGender(preValue) );
    }

    return {
        //*Métodos
        startGetAttributesByCategory,
        startGetProductsByAttributes,
        startGetProductsByGender
    }
}

