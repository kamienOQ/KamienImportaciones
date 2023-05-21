import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalViewOpen: false,
        isModalViewOpenProduct: false,
    },
    reducers: {
        onOpenProductModal: ( state ) => {
            state.isProductModalOpen = true;
        },
        onCloseProductModal: ( state ) => {
            state.isProductModalOpen = false;
        },
        onOpenModalViewProduct: ( state ) => {
            state.isModalViewOpenProduct = true;
        },
        onCloseModalViewProduct: ( state ) => {
            state.isModalViewOpenProduct = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    onOpenModalView,
    onCloseModalView,
    onOpenProductModal, 
    onCloseProductModal, 
    onOpenModalViewProduct,
    onCloseModalViewProduct,
    isModalViewOpenProduct,
} = uiSlice.actions;