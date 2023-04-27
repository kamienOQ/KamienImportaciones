import { useDispatch, useSelector } from "react-redux";
import { onOpenCloseProductsFilter, onSetCategoriesFilter } from "../store/masterPage/masterPageSlice";

export const useMasterPageStore = () => {
    const dispatch = useDispatch();

    const { 
        isproductsFilterOpen,
        categoriesFilter
    } = useSelector( state => state.masterPage );

    //*Slice
    const openCloseProductsFilter = () => {
        dispatch( onOpenCloseProductsFilter() );
    }

    const setCategoriesFilter = (filter) => {
        dispatch( onSetCategoriesFilter(filter) );
    }

    return{
        //*Propiedades
        isproductsFilterOpen,
        categoriesFilter,
        
        //*Métodos
        openCloseProductsFilter,
        setCategoriesFilter
    }

}