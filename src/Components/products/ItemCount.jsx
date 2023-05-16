import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup, Grid, IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useProductsStore, useUiStore } from '../../hooks';
import { onSetProducts } from '../../store/cart/cartSlice';
import { useDispatch } from 'react-redux';

export const ItemCount = ( { product, selectedAttributes } ) => {

  const { closeProductModal } = useUiStore();

  const { isSaving } = useProductsStore();
  
  const [ count, setCount ] = useState(1);

  const dispatch = useDispatch();

  const onAdd = () => {
    const tempProduct = {
      id: uuidv4(),
      name: product.productName,
      image: product.image.url,
      relatedListAttributes: selectedAttributes,
      price: product.price,
      quantity: count
    }
    dispatch(onSetProducts(tempProduct));
    closeProductModal();
  }

  const decrease = () => {
    setCount(count - 1);
  }

  const increase = () => {
    setCount(count + 1);
  }
    
  const onCloseModa = () => {
    closeProductModal();
  }

  return (
    <>
      <div>
        <ButtonGroup 
          sx={{ m: 2 }}
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
          {<Button disabled>{count}</Button>}
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
          >
            Agregar al carrito
          </Button>
      </div>
      <Grid 
        container justifyContent="flex-end" sx={{ position: 'absolute', bottom: '98%', right: '4%' }}
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
    </>
  )
}
