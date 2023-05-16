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
    },
    onDeleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
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
    },
    onIncreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.quantity += 1;
      }
    },
    onCleanProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  onSetProducts,
  onDeleteProduct,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onCleanProducts,
} = cartSlice.actions;
