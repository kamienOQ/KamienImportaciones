import { createSlice } from '@reduxjs/toolkit'
/*********************************************************/
export const attibutesSlice = createSlice({
    name: 'attributes',
    initialState: {  
        isSaving: false,
        message: {
            error: '',
            success: ''
        },
        numberCategories: undefined,
        attributes: [],
        category: "Relojes",
        products: [],
        isLoading: false,
        editing: false,
        filtering: false,
        filter: {},
        activeAttribute: null, 
    },
    reducers: {
        onSetCategories: ( state, { payload } ) => {
            state.category.push( payload );
            state.isLoading = false;    
        },
        onSetAttributes: ( state, { payload } ) => {
            state.attributes = payload;
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
            console.log(state.category)
            return state.category;
        },
        onGetProducts: (state) => {
            return state.products;
        },
        
        
       onAddErrorMessage: ( state, { payload } ) => {
            state.message.error = payload;
        },
        onAddSuccessMessage: ( state, { payload } ) => {
            state.message.success = payload;
        },
        
        
        
        onChangeFiltering: ( state, { payload } )=> {
            state.filtering = payload
        },
        onChangeFilter: ( state, { payload } )=> {
            state.filter = payload
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
        onCleanActiveCategory: ( state ) => {
            state.activeAttribute = null;
        },

    }
});


// Action creators are generated for each case reducer function
export const { 
    onAddErrorMessage,
    onAddSuccessMessage,
    onChangeFilter,
    onChangeFiltering,
    onCleanActiveCategory,

    onSetAttributes,
    onCleanAttributes,
    onSetCategories,
    onCleanCategories,
    onCleanProducts,
    onSetProducts,
    onGetAttributes,
    onGetProducts,
    onGetCategory,
} = attibutesSlice.actions;