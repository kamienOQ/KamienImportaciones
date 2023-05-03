import { configureStore } from '@reduxjs/toolkit'
import { aboutSlice } from './about/aboutSlice';
import { categoriesSlice } from './categories/categoriesSlice';
import { filtersPageSlice } from './filters/filtersPageSlice';



export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        filtersPage: filtersPageSlice.reducer,
        categories: categoriesSlice.reducer,
    }
});