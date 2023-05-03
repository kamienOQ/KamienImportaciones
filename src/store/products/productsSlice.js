import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productsSelected: []
    },
    reducers: {
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
        },
        onSetProductsByCategorySelect: ( state, { payload } ) => {
            state.productsSelected = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetProducts, onSetProductsByCategorySelect } = productsSlice.actions;