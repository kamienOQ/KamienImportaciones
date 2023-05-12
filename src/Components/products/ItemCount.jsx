import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const ItemCount = ( { initial, onAdd } ) => {
  
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
            color="success" disabled={count <= 0} onClick={() => onAdd(count)}
          >
            Agregar al carrito
          </Button>
        </div>
    </>
  )
}
