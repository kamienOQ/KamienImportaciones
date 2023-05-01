import { useDispatch } from "react-redux";
import {onStartGetAttributesByCategory} from "../store/attributes/";

export const useAttributesStore = () => {
    const dispatch = useDispatch();

    //*Thunks
    const startGetAttributesByCategory = (categoryName) => {
        dispatch( onStartGetAttributesByCategory(categoryName) );
    }

    return {
        //*Métodos
        startGetAttributesByCategory
    }
}

//export { startGetAttributesByCategory };
