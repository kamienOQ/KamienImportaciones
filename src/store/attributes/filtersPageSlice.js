import { createSlice } from '@reduxjs/toolkit';

export const filtersPageSlice = createSlice({
    name: 'filtersPage',
    initialState: {
        isproductsFilterOpen: false,
        categoriesFilter: ''
    },
    reducers: {
        onOpenCloseProductsFilter: ( state ) => {
            state.isproductsFilterOpen = !state.isproductsFilterOpen;
        },
        onSetCategoriesFilter: ( state, { payload } ) => {
            state.categoriesFilter = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    onOpenCloseProductsFilter,
    onSetCategoriesFilter
} = filtersPageSlice.actions;