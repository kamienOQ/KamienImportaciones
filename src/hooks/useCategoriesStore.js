import { useDispatch, useSelector } from "react-redux";
import { onStartGetCategories } from "../store/categories/thunks";


export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { 
        categories
    } = useSelector( state => state.categories );

    //*Slice

    //*Thunks
    const startGetCategories = () => {
        dispatch( onStartGetCategories() );
    }

    return{
        //*Propiedades
        categories,
        
        //*Métodos
        startGetCategories,
    }

}