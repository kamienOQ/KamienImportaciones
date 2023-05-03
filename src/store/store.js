import { configureStore } from '@reduxjs/toolkit'
import { aboutSlice } from './about/aboutSlice';
import { masterPageSlice } from './masterPage/masterPageSlice';
import { categoriesSlice } from './categories/categoriesSlice';
import { cartSlice } from "./cart/cartSlice";


export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        masterPage: masterPageSlice.reducer,
        categories: categoriesSlice.reducer,
        cart: cartSlice.reducer,
    }
});


