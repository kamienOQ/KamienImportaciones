import { configureStore } from '@reduxjs/toolkit'
import { filterSlice } from './'

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
    }
});