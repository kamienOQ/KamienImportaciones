import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: []
    },
    reducers: {
        onSetCategories: ( state, { payload } ) => {
            state.categories = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetCategories } = categoriesSlice.actions;