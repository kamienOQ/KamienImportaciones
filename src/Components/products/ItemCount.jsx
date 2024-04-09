import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Grid, IconButton, Snackbar, Alert } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useProductsStore, useUiStore } from '../../hooks';
import { onSetProducts } from '../../store/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export const ItemCount = ({ product, selectedAttributes }) => {
  const { closeProductModal } = useUiStore();
  const { isSaving } = useProductsStore();
  const [count, setCount] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);

  const closeAlert = () => {
    setShowAlert(false); // Ocultar la alerta cuando se cierre
    closeProductModal();
  };

  const onAdd = () => {
    const existingProductIndex = cartProducts.findIndex((cartProduct) => {
      return (
        cartProduct.name === product.productName &&
        isEqualAttributes(cartProduct.relatedListAttributes, selectedAttributes)
      );
    });

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, mostrar la alerta
      setShowAlert(true);
    } else {
      const tempProduct = {
        id: uuidv4(),
        date: product.date,
        name: product.productName,
        image: product.image.url,
        relatedListAttributes: selectedAttributes,
        price: product.price,
        quantity: count
      }
      dispatch(onSetProducts(tempProduct));
      closeProductModal();
    }
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  const onCloseModa = () => {
    closeProductModal();
  };

  return (
    <>
      <div>
        <ButtonGroup
          sx={{ m: 5 }}
          className='addCart-modal-button'
          color="success"
          size="small"
          aria-label="small outlined button group"
          variant="contained"
        >
          <Button
            disabled={count <= 1}
            onClick={decrease}
          >
            -
          </Button>
          {<Button sx={{ "&:disabled": { bgcolor: "tertiary.main", color: "dark.main" } }} disabled>{count}</Button>}
          <Button
            onClick={increase}
          >
            +
          </Button>
        </ButtonGroup>
      </div>
      <div
        className='addCart-modal-button'
      >
        <Button
          startIcon={<AddShoppingCartIcon />}
          variant="contained"
          color="success"
          disabled={count <= 0}
          onClick={() => onAdd(count)}
          sx={{
            bottom: '12px',
            borderRadius: '15px',
            fontSize: '10px'
          }}
        >
          Agregar al carrito
        </Button>
      </div>
      <Grid
        container justifyContent="flex-end" sx={{ position: 'absolute', bottom: '99%', right: '0%' }}
      >
        <IconButton
          variant="contained"
          color="grayCoco"
          onClick={onCloseModa}
          sx={{
            backgroundColor: "tertiary.main",
            borderRadius: '50%',
            position: "absolute",
          }}
          disabled={isSaving}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      {/* Alerta */}
      <Snackbar open={showAlert} autoHideDuration={1000} onClose={closeAlert} sx={{ alignItems: "flex-start", mt: "42px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>
        <Alert onClose={closeAlert} severity="warning" sx={{ width: '100%' }}>
          Ya existe un producto en el carrito con los mismos atributos!
        </Alert>
      </Snackbar>
    </>
  )
}

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
