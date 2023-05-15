import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cartSlice";
import { aboutSlice } from './about/aboutSlice';
import { categoriesSlice } from './categories/categoriesSlice';
import { uiAttSlice, uiSlice } from './'
import { productsSlice } from "./products/productsSlice";
import { filterSlice } from './'

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        about: aboutSlice.reducer,
        cart: cartSlice.reducer,
        categories: categoriesSlice.reducer,
        products: productsSlice.reducer,
        uiAtt: uiAttSlice.reducer,
        filter: filterSlice.reducer,
    }
});
