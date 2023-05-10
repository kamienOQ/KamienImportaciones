import { configureStore } from '@reduxjs/toolkit'
import { aboutSlice } from './about/aboutSlice';
import { filtersPageSlice } from './filters/filtersPageSlice';



export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        filtersPage: filtersPageSlice.reducer,
    }
});