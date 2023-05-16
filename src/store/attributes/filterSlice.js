import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {  
        category: '',
        attributesSelected: [],
        genderFilter: '',
        attributesFilter: [],
    },
    reducers: {
        onSetAttributes: ( state, { payload } ) => {
            state.attributes = payload;
        },
        onSetProducts: ( state, { payload } ) => {
            state.products = payload;
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
        onSetGenderFilter: (state, { payload }) => {
            state.genderFilter = payload;
        },
        onSetAttributesFilter: (state, { payload }) => {
            state.attributesFilter.push(payload);
        },
        onDeleteAttributesFilter: (state, { payload }) => {
            state.attributesFilter =  state.attributesFilter.filter(attribute => attribute !== payload);
        }

    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetAttributes,
    onCleanAttributes,
    onCleanProducts,
    onSetProducts,
    onSetAttributesSelected,
    onCleanAttributesSelected,
    onSetGenderFilter,
    onSetAttributesFilter,
    onDeleteAttributesFilter,
} = filterSlice.actions;