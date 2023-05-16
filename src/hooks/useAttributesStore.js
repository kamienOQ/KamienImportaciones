import { useDispatch,useSelector  } from "react-redux";
import {onStartGetAttributesByCategory,onStartGetProductsByAttributes,onStartGetProductsByGender,onSetAttributesSelected, 
    onCleanAttributesSelected, onSetGenderFilter, onSetAttributesFilter, onDeleteAttributesFilter} from "../store/attributes";

export const useAttributesStore = () => {
    const dispatch = useDispatch();

    const { 
        productsSelected,
        attributes,
        genderFilter,
        attributesFilter
    } = useSelector( state => state.filter);

    //*Slide
    const setAttributesSelected = (attributesSelected)=>{
        dispatch(onSetAttributesSelected(attributesSelected));
    }
    
    const cleanAttributesSelected = ()=>{
        dispatch(onCleanAttributesSelected());
    }

    const getAttributes = ()=>{
        dispatch(onGetAttributes());
    }

    const setGenderFilter = (value) => {
        dispatch( onSetGenderFilter(value) );
    }

    const setAttributesFilter = (value) => {
        dispatch( onSetAttributesFilter(value) );
    }
    
    const deleteAttributesFilter = (value) => {
        dispatch( onDeleteAttributesFilter(value) );
    }

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
        productsSelected,
        attributes,
        genderFilter,
        attributesFilter,

        //*Métodos
        startGetAttributesByCategory,
        startGetProductsByAttributes,
        startGetProductsByGender,
        setAttributesSelected,
        cleanAttributesSelected,
        getAttributes,
        setGenderFilter,
        setAttributesFilter,
        deleteAttributesFilter,
    }
}

