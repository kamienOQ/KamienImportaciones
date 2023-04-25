import { useDispatch, useSelector } from "react-redux";
import { onSetData } from "../store/about/aboutSlice";
import { onStartGetAbout } from "../store/about/thunks";


export const useAboutStore = () => {
    const dispatch = useDispatch();

    const { 
        description,
        instagram,
        name,
        whatsapp
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
        name,
        whatsapp,
        
        //*Métodos
        setData,
        startGetAbout,
    }

}