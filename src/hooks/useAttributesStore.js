import { useDispatch,useSelector  } from "react-redux";
import {onStartGetAttributesByCategory,onStartGetProductsByAttributes,onStartGetProductsByGender,onSetAttributesSelected, onCleanAttributesSelected} from "../store/attributes";

export const useAttributesStore = () => {
    const dispatch = useDispatch();

    const { 
        productsSelected,
        attributes,
    } = useSelector( state => state.filter);

    //Slide
    const setAttributesSelected = (attributesSelected)=>{
        dispatch(onSetAttributesSelected(attributesSelected));
    }
    
    const cleanAttributesSelected = ()=>{
        dispatch(onCleanAttributesSelected());
    }

    const getAttributes = ()=>{
        dispatch(onGetAttributes());
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

        //*Métodos
        startGetAttributesByCategory,
        startGetProductsByAttributes,
        startGetProductsByGender,
        setAttributesSelected,
        cleanAttributesSelected,
        getAttributes,
    }
}

