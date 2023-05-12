import { useState } from 'react';
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid } from "@mui/material"
import { useUiStore } from '../../hooks/useUiStore';
import { ItemCount } from './ItemCount'
import { Link } from 'react-router-dom';

export const ProductsDetail = ({urlImage, urlIcon, productName, price, relatedAttributes, relatedListAttributes}) => {

    const { openProductModal, closeProductModal, isProductModalOpen } = useUiStore();

    const [ gotoCart, setGotoCart ] = useState(false);

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
                <figure className='container-figure-img'>
                    <img src={urlImage} alt="" className='productsCards-img'/>
                </figure>
                <h2 className='productsDetailCards-text'>{productName}</h2>
                <h2 className='productsDetailCards-text'>Precio: ₡{price}</h2>
                {/* <h2 className='productsDetailCards-text'>{relatedAttributes}</h2> */}
                <h2 className='productsDetailCards-text'>Lista de atributos: {relatedAttributes}</h2>
                <div className='content'>
                    <h1>{productName}</h1>
                    {
                        gotoCart
                            ? <Link to={'/Cart'}>Terminar Compra</Link>
                            : <ItemCount initial={1} onAdd = { onAdd } />
                    }
                </div>
            </div>
        </div>
    </DialogContent>
    </Dialog>
  )
}