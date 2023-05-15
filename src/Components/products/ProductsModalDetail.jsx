import { useState } from 'react';
import { TextField, Dialog, DialogTitle, Button, MenuItem, IconButton, DialogContent, Avatar, Typography, Alert, Grid, ListItem } from "@mui/material"
import { useUiStore } from '../../hooks/useUiStore';
import { ItemCount } from './ItemCount'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export const ProductsModalDetail = ({product, productName, price, relatedAttributes, relatedListAttributes}) => {

    const { isProductModalOpen } = useUiStore();

    /* Estado para los checkboxes */
    const [ attributesSelected, setAttributesSelected ] = useState([]);

    function handleAttributeSelected(event) {
        const { id, checked } = event.target;
        if (checked) {
            setAttributesSelected([...attributesSelected, id]); // agregar el atributo seleccionado al estado
        } else {
            setAttributesSelected(attributesSelected.filter(attribute => attribute !== id)); // quitar el atributo seleccionado del estado
        }
    }

    console.log(relatedAttributes)


  return (
    <Dialog 
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
                            <FormLabel component="legend">Atributos relacionados al producto</FormLabel>
                               <FormGroup>
                                    {/* {relatedAttributes.map((attribute, index) => (  
                                        <div key={index}
                                            // control={
                                            //     <Checkbox
                                            //         checked={setState[index]}
                                            //         onChange={(e) => handleChange(index, e.target.checked)}
                                            //     />
                                            // }
                                            // label={`${relatedAttributesLabels} : ${attribute}`}
                                        >
                                            <ListItem  sx={{ display: 'block'}}>
                                                <FormLabel>{attribute.attributeSelected}</FormLabel>
                                            </ListItem>
                                        </div>
                                    ))} */}
                                    <ListItem sx={{ display: 'grid', justifyContent:"center", ml: 2}}>
                                        {relatedListAttributes.map((relatedAttribute, index) => (
                                        <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox 
                                                    id={relatedAttribute} 
                                                    name={relatedAttribute} 
                                                    checked={attributesSelected.includes(relatedAttribute)}
                                                    onChange={handleAttributeSelected}
                                                />
                                            }
                                            label={relatedAttribute}
                                        />
                                        ))}
                                    </ListItem>
                                </FormGroup> 
                            <FormHelperText>Selecciona los atributos que deseas</FormHelperText>
                        </FormControl>
                    </Box>
                    <ItemCount product = { product } selectedAttributes={attributesSelected} />
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

