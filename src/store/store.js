import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cartSlice";
import { aboutSlice } from './about/aboutSlice';
import { categoriesSlice } from './categories/categoriesSlice';
import { attibutesSlice, uiAttSlice } from './'
import { filtersPageSlice } from './filters/filtersPageSlice';


export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        cart: cartSlice.reducer,
        categories: categoriesSlice.reducer,
        uiAtt: uiAttSlice.reducer,
        attributes: attibutesSlice.reducer,
        filtersPage: filtersPageSlice.reducer,
    }
});
