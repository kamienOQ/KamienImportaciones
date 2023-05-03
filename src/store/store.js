import { configureStore } from '@reduxjs/toolkit'
<<<<<<< HEAD
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


=======
import { attibutesSlice, uiAttSlice } from './'

export const store = configureStore({
    reducer: {
        uiAtt: uiAttSlice.reducer,
        attributes: attibutesSlice.reducer,
    }
});
>>>>>>> bba5ec00504c2015b5f491422a435ee1d7bbedfe
