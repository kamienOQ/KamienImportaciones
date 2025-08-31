import { useDispatch, useSelector } from "react-redux";
import { onStartGetCategoriesInformedNotices } from "../store/category_Informed/thunks";
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
        dispatch( onStartGetCategoriesInformedNotices() );
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