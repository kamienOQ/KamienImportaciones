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
      const { id, quantity, relatedListAttributes } = action.payload;
    
      // Buscar si ya existe un producto en el carrito con los mismos atributos
      const existingProductIndex = state.products.findIndex(product => {
        return product.id === id && isEqualAttributes(product.relatedListAttributes, relatedListAttributes);
      });
    
      if (existingProductIndex !== -1) {
        // Producto existente encontrado
        state.products[existingProductIndex].quantity = quantity;
      } else {
        // Producto no encontrado, agregarlo al carrito
        state.products.push({
          id,
          quantity,
          relatedListAttributes
        });
      }
    
      // Restablecer el estado del carrito
      state.activeCartProduct = null;
      state.activeProduct = null;
      state.isModalViewOpenCart = false;
      state.message.error = false;
      state.message.success = true;
    
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

// Función de utilidad para verificar si los atributos son iguales
const isEqualAttributes = (attributes1, attributes2) => {
  const keys1 = Object.keys(attributes1);
  const keys2 = Object.keys(attributes2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (attributes1[key] !== attributes2[key]) {
      return false;
    }
  }

  return true;
};