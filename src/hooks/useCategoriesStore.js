import { useDispatch, useSelector } from "react-redux";
import { onStartGetCategories } from "../store/categories/thunks";
import { onSetCategorySelected } from "../store/categories/categoriesSlice";


export const useCategoriesStore = () => {
    const dispatch = useDispatch();

    const { 
        categories,
        categorySelected
    } = useSelector( state => state.categories );

    //*Slice
    const setCategorySelected = (categoryName) => {
        dispatch( onSetCategorySelected(categoryName) );
    }

    //*Thunks
    const startGetCategories = () => {
        dispatch( onStartGetCategories() );
    }

    return{
        //*Propiedades
        categories,
        categorySelected,
        
        //*Métodos
        startGetCategories,
        setCategorySelected,
    }

}