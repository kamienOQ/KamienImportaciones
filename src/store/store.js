import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cartSlice";
import { aboutSlice } from './about/aboutSlice';
import { masterPageSlice } from './masterPage/masterPageSlice';
import { categoriesSlice } from './categories/categoriesSlice';
import { attibutesSlice, uiAttSlice } from './'


export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        masterPage: masterPageSlice.reducer,
        cart: cartSlice.reducer,
        categories: categoriesSlice.reducer,
        uiAtt: uiAttSlice.reducer,
        attributes: attibutesSlice.reducer,
    }
});