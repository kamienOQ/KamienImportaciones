import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productsSelected: '',
    },
    reducers: {
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
        },
        onSetProductSelected: ( state, { payload } ) => {
            state.productsSelected = payload;
        },
        onSetProductsByCategorySelect: ( state, { payload } ) => {
            state.productsSelected = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetProducts, 
    onSetProductSelected, 
    onSetProductsByCategorySelect 
} = productsSlice.actions;