import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
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
  },
});

export const {
  onSetProducts,
  onSetAllProducts,
  onDeleteProduct,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onCleanProducts,
} = cartSlice.actions;
