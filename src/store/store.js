import { configureStore } from '@reduxjs/toolkit'
import { aboutSlice } from './about/aboutSlice';
import { masterPageSlice } from './masterPage/masterPageSlice';


export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        masterPage: masterPageSlice.reducer,
    }
});