import { useState } from 'react';
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid } from "@mui/material"
import { useUiStore } from '../../hooks/useUiStore';

export const ProductsDetail = () => {

    const { openProductModal, closeProductModal, isProductModalOpen } = useUiStore();

    const [gotoCart, setGotoCart] = useState(false);

    const onAdd = () => {
        setGotoCart(true);
    }

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };

  return (
    <Dialog className='modal-container-product'
        open={isProductModalOpen} 
        align="center"
    >
    <DialogContent>
        <DialogTitle 
            variant="h7"  
            sx={ { borderRadius: '16px', backgroundColor: "dark.main", color: "tertiary.main" } }
        >
            Comprar el producto seleccionado
        </DialogTitle >
        <div>
            <div className='detail'>
                <img className='detail_image' src="{data.image}" alt="" />
                <div className='content'>
                    <h1>{data.title}</h1>
                    {
                        gotoCart
                            ? <Link to={'/cart'}>Terminar Compra</Link>
                            : <ItemCount initial={1} onAdd = { onAdd } />
                    }
                </div>
            </div>
        </div>
    </DialogContent>
    </Dialog>
  )
}