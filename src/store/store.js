import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cartSlice";
import { aboutSlice } from './about/aboutSlice';
import { categoriesSlice } from './categories/categoriesSlice';
import { attibutesSlice, uiAttSlice, uiSlice } from './'
import { filtersPageSlice } from './filters/filtersPageSlice';
import { productsSlice } from "./products/productsSlice";


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        about: aboutSlice.reducer,
        cart: cartSlice.reducer,
        categories: categoriesSlice.reducer,
        products: productsSlice.reducer,
        uiAtt: uiAttSlice.reducer,
        attributes: attibutesSlice.reducer,
        filtersPage: filtersPageSlice.reducer,
    }
});
