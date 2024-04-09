import { useState } from 'react';
import { Button, ButtonGroup, Grid, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { onCloseModalViewCart, onSetDetailsProducts } from '../../store/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export const CartItemCount = ({ selectedAttributes }) => {
  const { activeCartProduct } = useSelector((state) => state.cart);

  const { id, quantity } = activeCartProduct;

  const [count, setCount] = useState(quantity);

  const dispatch = useDispatch();

  const decrease = () => {
    setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  const onCloseModal = () => {
    dispatch(onCloseModalViewCart());
  };

  const onSave = () => {
    const newDetails = {
      id,
      quantity: count,
      relatedListAttributes: selectedAttributes
    }
    dispatch(onSetDetailsProducts(newDetails));
  };

  return (
    <>
      <div>
        <ButtonGroup
          sx={{ m: 4 }}
          className="addCart-modal-button"
          color="success"
          size="small"
          aria-label="small outlined button group"
          variant="contained"
        >
          <Button disabled={count <= 1} onClick={decrease}>
            -
          </Button>
          {
            <Button
              sx={{
                "&:disabled": { bgcolor: "tertiary.main", color: "dark.main" },
              }}
              disabled
            >
              {count}
            </Button>
          }
          <Button onClick={increase}>+</Button>
        </ButtonGroup>
      </div>
      <div className="addCart-modal-button">
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          color="success"
          disabled={count <= 0}
          onClick={onSave}
          sx={{ bottom: "10px" }}
        >
          Guardar
        </Button>
      </div>
      <Grid
        container
        justifyContent="flex-end"
        sx={{ position: "absolute", bottom: "99%", right: "0%" }}
      >
        <IconButton
          variant="contained"
          color="grayCoco"
          onClick={onCloseModal}
          sx={{
            backgroundColor: "tertiary.main",
            borderRadius: "50%",
            position: "absolute",
          }}
          // disabled={isSaving}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
    </>
  );
};
