import { useDispatch, useSelector } from "react-redux";
import { onOpenCloseProductsFilter, onSetCategoriesFilter } from "../store/filters/filtersPageSlice";

export const useFiltersPageStore = () => {
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