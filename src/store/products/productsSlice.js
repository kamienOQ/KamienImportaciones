import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: '',
        message: {      
            error: '',
            success: ''
        },
        activeProduct: null,
    },
    reducers: {
        onSetActiveProduct: ( state, { payload } ) => {
            state.activeProduct = payload;
        },
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
        },
        onSetProductSelected: ( state, { payload } ) => {
            state.productsSelected = payload;
        },
        onAddErrorMessage: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessage: ( state, { payload } ) => {
            state.message.success = payload;
        },
        onSetProductsByCategorySelect: ( state, { payload } ) => {
            state.productsSelected = payload;
        },
        onCleanActiveProduct: ( state ) => {
            state.activeProduct = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetActiveProduct, 
    onSetProducts, 
    onSetProductSelected, 
    onAddErrorMessage,
    onAddSuccessMessage,
    onSetProductsByCategorySelect,
    onCleanActiveProduct,
} = productsSlice.actions;