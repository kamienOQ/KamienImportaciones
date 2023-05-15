import { useState } from 'react';
import { Dialog, DialogContent, ListItem, RadioGroup, Radio } from "@mui/material"
import { useUiStore } from '../../hooks/useUiStore';
import { ItemCount } from './ItemCount'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

export const ProductsModalDetail = ({product, productName, price, relatedAttributes, relatedListAttributes}) => {

    const { isProductModalOpen } = useUiStore();

    /* Estado para los checkboxes */
    const [ attributesSelected, setAttributesSelected ] = useState([]);

    const handleAttributeSelected = (event, attribute) => {
        setAttributesSelected((prevState) => ({
          ...prevState,
          [attribute]: event.target.value,
        }));
    };

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
                            <label component="legend">Atributos relacionados al producto</label>
                               <FormGroup>
                                    {relatedAttributes.map((attribute, index) => (  
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
                                                <label>{attribute}</label>
                                            </ListItem>
                                            <ListItem sx={{ display: 'grid', ml: 2}}>
                                                <RadioGroup 
                                                    onChange={ ( event ) => handleAttributeSelected(event, attribute) }
                                                > 
                                                    {relatedListAttributes.map((relatedAttribute, index) => (
                                                        relatedAttribute.attributeSelected === attribute && 
                                                        <FormControlLabel
                                                            value={relatedAttribute.feature}
                                                            key={index}                                                        
                                                            control={
                                                                <Radio 
                                                                    id={relatedAttribute.feature} 
                                                                    name={relatedAttribute.feature} 
                                                                />
                                                            }
                                                            label={relatedAttribute.feature}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </ListItem>
                                        </div>
                                    ))}
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

