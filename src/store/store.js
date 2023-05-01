import { configureStore } from '@reduxjs/toolkit'
import { attibutesSlice, uiAttSlice } from './'

export const store = configureStore({
    reducer: {
        uiAtt: uiAttSlice.reducer,
        attributes: attibutesSlice.reducer,
    }
});