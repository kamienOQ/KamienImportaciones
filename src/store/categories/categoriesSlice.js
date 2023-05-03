import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        categorySelected: '',
    },
    reducers: {
        onSetCategories: ( state, { payload } ) => {
            state.categories = payload;
        },
        onSetCategorySelected: ( state, { payload } ) => {
            state.categorySelected = payload;
        }

    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetCategories, 
    onSetCategorySelected,
    
} = categoriesSlice.actions;