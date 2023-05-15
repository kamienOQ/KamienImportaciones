import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {  
        attributes: [],
        category: 'Relojes',
        //category: 'Lentes',
        products: [],
        attributesSelected: [],
    },
    reducers: {
        onSetAttributes: ( state, { payload } ) => {
            state.attributes = payload;
        },
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
        },
        onGetAttributes: (state) => {
            console.log(state.attributes);
        },
        onGetCategory: (state) => {
            return state.category;
        },
        onGetProducts: (state) => {
            return state.products;
        },
        onCleanAttributes: ( state ) => {
            state.attributes = [];
        },
        onCleanProducts: ( state ) => {
            state.products = [];
        },
        onSetAttributesSelected: (state, { payload }) => {
            state.attributesSelected = payload;
        },
        onCleanAttributesSelected: (state) => {
            state.attributesSelected = [];
        },

    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetAttributes,
    onCleanAttributes,
    onCleanProducts,
    onSetProducts,
    onGetAttributes,
    onGetProducts,
    onGetCategory,
    onSetAttributesSelected,
    onCleanAttributesSelected,
} = filterSlice.actions;