import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {  
        attributes: [],
        category: 'Relojes',
        products: [],
    },
    reducers: {
        onSetAttributes: ( state, { payload } ) => {
            //state.attributes = payload;
            state.attributes.push( payload );
            state.isLoading = false;
        },
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
            state.isLoading = false;
        },
        onGetAttributes: (state) => {
            return state.attributes;
        },
        onGetCategory: (state) => {
            //console.log(state.category)
            return state.category;
        },
        onGetProducts: (state) => {
            return state.products;
        },
        onCleanAttributes: ( state ) => {
            state.attributes = [];
            state.activeAttribute = null;
            state.isLoading = true;
        },
        onCleanProducts: ( state ) => {
            state.products = [];
            state.activeAttribute = null;
            state.isLoading = true;
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
} = filterSlice.actions;