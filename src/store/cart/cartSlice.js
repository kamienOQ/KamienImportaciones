import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    activeCartProduct: null,
    activeProduct: null,
    isModalViewOpenCart: false,
    message: {      
      error: false,
      success: false
    },
  },
  reducers: {
    onSetProducts: (state, action) => {
      const product = state.products.find( (product) => {
        let equalAttributes = true
        for (let prop in product.relatedListAttributes) {
          if (product.relatedListAttributes[prop] !== action.payload.relatedListAttributes[prop]) {
            equalAttributes = false;
          }
        }
        if (product.name === action.payload.name && equalAttributes) {
          return product;
        }
        return undefined;
      });
      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    onSetDetailsProducts: (state, action) => {
      const validProduct = state.products.find( (product) => {
        let equalAttributes = true
        for (let prop in product.relatedListAttributes) {
          if (product.relatedListAttributes[prop] !== action.payload.relatedListAttributes[prop]) {
            equalAttributes = false;
          }
        }
        if (product.id !== action.payload.id && equalAttributes) {
          return product;
        }
        return undefined;
      });
      if (!validProduct) {
        const product = state.products.find((product) => product.id === state.activeCartProduct.id);
        product.quantity = action.payload.quantity;
        product.relatedListAttributes = action.payload.relatedListAttributes;
        state.activeCartProduct = null;
        state.activeProduct = null;
        state.isModalViewOpenCart = false;
        state.message.error = false;
        state.message.success = true;
        localStorage.setItem('cartProducts', JSON.stringify(state.products));
      } else {
        state.message.error = true;
      }
    },
    onSetAllProducts: (state, action) => {
      state.products = action.payload;
    },
    onDeleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    onDecreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        }
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    onIncreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.quantity += 1;
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    onCleanProducts: (state) => {
      state.products = [];
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    onSetActiveCartProduct: (state, action) => {
      state.activeCartProduct = action.payload;
    },
    onSetActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
    onOpenModalViewCart: ( state ) => {
      state.isModalViewOpenCart = true;
      state.message.error = false;
      state.message.success = false;
    },
    onCloseModalViewCart: ( state ) => {
      state.isModalViewOpenCart = false;
    },
    onCloseError: ( state ) => {
      state.message.error = false;
    },
    onCloseSuccess: ( state ) => {
      state.message.success = false;
    },
  },
});

export const {
  onSetProducts,
  onSetDetailsProducts,
  onSetAllProducts,
  onDeleteProduct,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onCleanProducts,
  onSetActiveCartProduct,
  onSetActiveProduct,
  onOpenModalViewCart,
  onCloseModalViewCart,
  onCloseError,
  onCloseSuccess
} = cartSlice.actions;
