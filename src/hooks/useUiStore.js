import { useDispatch, useSelector } from 'react-redux';
    
// Ui
import { onCloseModalView, onOpenModalView, onCloseProductModal, onOpenProductModal } from '../store/ui/uiSlice';
// Product
import { onCloseModalViewProduct, onOpenModalViewProduct } from '../store'; 
import { onCleanActiveProduct } from '../store/products/productsSlice';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { 
        isProductModalOpen,
        isModalViewOpen,
        isModalViewOpenProduct,
    } = useSelector( state => state.ui );

    const openProductModal = () => {
        dispatch( onOpenProductModal() );
    }

    const closeProductModal = () => {
        dispatch( onCloseProductModal() );
        dispatch( onCleanActiveProduct() );
    }

    const openModalView = () => {
        dispatch( onOpenModalView() );
    }

    const closeModalView = () => {
        dispatch( onCloseModalView() );
    }

    const openModalViewProduct = () => {
        dispatch( onOpenModalViewProduct() )
    }

    const closeModalViewProduct = () => {
        dispatch( onCloseModalViewProduct() )
    }

    return {
        //*Propiedades
        isModalViewOpen,
        isProductModalOpen,
        isModalViewOpenProduct,

        //*Métodos
        openModalView,
        closeModalView,
        openProductModal,
        closeProductModal,
        openModalViewProduct,
        closeModalViewProduct,
    }

}