import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useProductsStore, useUiStore } from '../../hooks';

export const ItemCount = ( { initial, onAdd } ) => {

  const { closeProductModal, isProductModalOpen, categoriesSelected, attributesSelected, 
    listAttributesSelected  } = useUiStore();

  const { isSaving } = useProductsStore();
  
  const [count, setCount] = useState(parseInt(initial));

  const decrease = () => {
    setCount(count - 1);
  }

  const increase = () => {
    setCount(count + 1);
  }

  useEffect(() => {
    setCount(parseInt(initial));
  }, [initial])
    
  const onCloseModa = () => {
    closeProductModal();
  }

  return (
    <>
      <div>
        <ButtonGroup 
          sx={{ mb: 2 }}
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
      <div
        sx={{ mb: 2 }}
      >
        <Button 
          className="cancelProduct-button"
          startIcon={<CloseIcon />}
          variant="contained"
          color="error" 
          onClick={onCloseModa}
          sx={{ backgroundColor: "error.main", borderRadius: 20, mt: 2 }}
          disabled={isSaving}
        >
          Salir
        </Button>
      </div>
    </>
  )
}
