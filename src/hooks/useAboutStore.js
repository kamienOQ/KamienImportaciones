import { useDispatch, useSelector } from "react-redux";
import { onSetData } from "../store/about/aboutSlice";
import { onStartGetAbout } from "../store/about/thunks";


export const useAboutStore = () => {
    const dispatch = useDispatch();

    const { 
        description,
        instagram,
        facebook,
        name,
        whatsapp,
        logo
    } = useSelector( state => state.about );

    //*Slice
    const setData = () => {
        dispatch( onSetData() );
    }

    //*Thunks
    const startGetAbout = () => {
        dispatch( onStartGetAbout() );
    }

    return{
        //*Propiedades
        description,
        instagram,
        facebook,
        name,
        whatsapp,
        logo,
        
        //*Métodos
        setData,
        startGetAbout,
    }

}