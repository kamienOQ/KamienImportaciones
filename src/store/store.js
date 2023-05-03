import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cartSlice";
import { aboutSlice } from './about/aboutSlice';
import { masterPageSlice } from './masterPage/masterPageSlice';
import { categoriesSlice } from './categories/categoriesSlice';


export const store = configureStore({
    reducer: {
        about: aboutSlice.reducer,
        masterPage: masterPageSlice.reducer,
<<<<<<< HEAD
        cart: cartSlice.reducer,
=======
        categories: categoriesSlice.reducer,
>>>>>>> dcb8fcfc0f2ab8c70d25a5a6c0cae966504893de
    }
});