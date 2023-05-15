import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Grid } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useProductsStore, useUiStore } from '../../hooks';
import { onSetProducts } from '../../store/cart/cartSlice';
import { useDispatch } from 'react-redux';

export const ItemCount = ( { product } ) => {

  const { closeProductModal } = useUiStore();

  const { isSaving } = useProductsStore();
  
  const [ count, setCount ] = useState(1);

  const dispatch = useDispatch();

  console.log(product)

  const onAdd = () => {
    const tempProduct = {
      id: product.id,
      name: product.productName,
      image: product.image.url,
      relatedListAttributes: product.relatedListAttributes,
      price: product.price,
      quantity: count
    }
    console.log(tempProduct)
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
        container justifyContent="flex-end" sx={{ position: 'absolute', bottom: '99%', right: '1%' }}
      >
        <Button 
          variant="contained"
          color="error" 
          onClick={onCloseModa}
          sx={{ 
            backgroundColor: "error.main", 
            borderRadius: '50%',
            position: "absolute", 
          }}
          disabled={isSaving}
        >
          <CloseIcon />
        </Button>
      </Grid>
    </>
  )
}
