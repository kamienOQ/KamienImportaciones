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

export const ProductsModalDetail = ({product, urlImage, urlIcon, productName, price, relatedAttributes, relatedListAttributes}) => {

    const { openProductModal, closeProductModal, isProductModalOpen } = useUiStore();

    /* Ejemplo de checkbox */
    /* Estado para los checkboxes */
    const [ state, setState ] = useState(relatedListAttributes.map(() => false));

    const handleChange = (index, checked) => {
        const updatedCheckboxState = [...setState];
        updatedCheckboxState[index] = checked;
        setState(updatedCheckboxState);
    };

    console.log(relatedAttributes)

    const relatedAttributesList = relatedAttributes.map((attributeSelected, index) => (
        relatedListAttributes.map((attribute, innerIndex) => (
          <FormControlLabel
            key={innerIndex}
            control={
              <Checkbox
                checked={state[innerIndex]}
                onChange={(e) => handleChange(innerIndex, e.target.checked)}
              />
            }
            label={attributeSelected + ' :' + ' ' + attribute}
          />
        ))
    ));

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
                            <FormLabel component="legend">Atributos relacionados</FormLabel>
                            <FormGroup>
                                {relatedListAttributes.map((attribute, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={setState[index]}
                                                onChange={(e) => handleChange(index, e.target.checked)}
                                            />
                                        }
                                        label={relatedAttributes + ' :' + ' ' + attribute}
                                  />
                                ))}
                            </FormGroup>
                            <FormHelperText>Selecciona los atributos relacionados</FormHelperText>
                        </FormControl>
                    </Box>
                    <ItemCount product = { product } />
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}