import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cartSlice";
import { aboutSlice } from './about/aboutSlice';
import { masterPageSlice } from './masterPage/masterPageSlice';


export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        masterPage: masterPageSlice.reducer,
        cart: cartSlice.reducer,
    }
});