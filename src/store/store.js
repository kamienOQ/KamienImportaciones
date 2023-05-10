import { configureStore } from '@reduxjs/toolkit'
import { aboutSlice } from './about/aboutSlice';
import { filtersPageSlice} from './attributes/filtersPageSlice';
import {filterSlice} from './'



export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        filtersPage: filtersPageSlice.reducer,
        filter: filterSlice.reducer,
    }
});