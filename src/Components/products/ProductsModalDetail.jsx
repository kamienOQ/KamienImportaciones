import { useState } from 'react';
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid } from "@mui/material"
import { useUiStore } from '../../hooks/useUiStore';
import { ItemCount } from './ItemCount'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export const ProductsModalDetail = ({product,urlImage, urlIcon, productName, price, relatedListAttributes}) => {

    const { openProductModal, closeProductModal, isProductModalOpen } = useUiStore();

    /* Ejemplo de checkbox */
    const [ state, setState ] = useState({
        gilad: true,
        jason: false,
        antoine: false,
    });
    
    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
    };

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <Dialog 
        className='modal-container-product'
        open={isProductModalOpen} 
        align="center"
    >
        <DialogContent>
            <div>
                <div className='product-form'>
                    <h1>{productName}</h1>
                    <h2 className='productsDetailCards-text'>Precio: ₡{price}</h2>
                    <Box sx={{ display: 'flex' }}>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Assign responsibility</FormLabel>
                            <FormGroup>
                            <FormControlLabel
                                control={
                                <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                                }
                                label="Gilad Gray"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={jason} onChange={handleChange} name="jason" />
                                }
                                label="Jason Killian"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
                                }
                                label="Antoine Llorca"
                            />
                            </FormGroup>
                            <FormHelperText>Be careful</FormHelperText>
                        </FormControl>
                    </Box>
                    <FormControl
                        required
                        error={error}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                    >
                        <FormLabel component="legend">Pick two</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                            }
                            label="Gilad Gray"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox checked={jason} onChange={handleChange} name="jason" />
                            }
                            label="Jason Killian"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
                            }
                            label="Antoine Llorca"
                        />
                        </FormGroup>
                        <FormHelperText>You can display an error</FormHelperText>
                    </FormControl>
                    <h2 className='productsDetailCards-text'>Lista de atributos: {relatedListAttributes}</h2>
                    <ItemCount product = { product } />
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}