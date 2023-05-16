import { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, FormControl, FormGroup, FormControlLabel, FormHelperText, ListItem, RadioGroup, Radio } from "@mui/material";
import { useUiStore } from '../../hooks/useUiStore';
import { ItemCount } from './ItemCount';

export const ProductsModalDetail = ({product, productName, price, relatedAttributes, relatedListAttributes}) => {

    const { isProductModalOpen } = useUiStore();

    const [firstAttribute, setFirstAttribute] = useState([])

    useEffect(() => {
        let tempList = []
        relatedAttributes.forEach(attribute => {
            for (let i = 0; i < relatedListAttributes.length; i++){
                if(attribute === relatedListAttributes[i].attributeSelected){
                    tempList.push(relatedListAttributes[i].feature);
                    break;
                }
            }
        });
        setFirstAttribute(tempList)
    }, [])

    // console.log(firstAttribute);
    

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
                                                {firstAttribute.length !== 0 &&
                                                    <RadioGroup 
                                                    onChange={ ( event ) => handleAttributeSelected(event, attribute) }
                                                    defaultValue={firstAttribute[index]}
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
                                                </RadioGroup>}
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

