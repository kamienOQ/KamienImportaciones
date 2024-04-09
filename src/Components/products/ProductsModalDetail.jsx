import { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, FormControl, FormGroup, FormControlLabel, FormHelperText, ListItem, RadioGroup, Radio, TableContainer } from '@mui/material';
import { useUiStore } from '../../hooks/useUiStore';
import { ItemCount } from './ItemCount';

export const ProductsModalDetail = ({ product, productName, price, relatedAttributes, relatedListAttributes }) => {

    const { isProductModalOpen } = useUiStore();

    /* Estado para los checkboxes */
    const [attributesSelected, setAttributesSelected] = useState([]);

    const [firstAttribute, setFirstAttribute] = useState([])

    useEffect(() => {
        let tempList = []
        let tempListObj = {}
        relatedAttributes.forEach(attribute => {
            for (let i = 0; i < relatedListAttributes.length; i++) {
                if (attribute === relatedListAttributes[i].attributeSelected) {
                    tempList.push(relatedListAttributes[i].feature);
                    tempListObj[attribute] = relatedListAttributes[i].feature;
                    break;
                }
            }
        });
        setAttributesSelected(tempListObj);

        setFirstAttribute(tempList)
    }, [])

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
                        <TableContainer
                            className='TableContainer'
                            sx={{
                                maxHeight: "400px",
                                '@media (min-width: 200px)': {
                                    marginLeft: '-45px',
                                    overflow: 'unset'
                                },
                                '@media (min-width: 360px)': {
                                    marginLeft: '-20px',
                                },
                                '@media (min-width: 912px)': {
                                    maxHeight: "460px",
                                },
                                '@media (min-width: 1024px)': {
                                    width: "460px",
                                }
                            }}
                        >
                            <Box sx={{ textAlign: 'center', display: 'flex', marginLeft: '50px' }}>
                                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                    <label component="legend">Atributos relacionados al producto:</label>
                                    <FormGroup>
                                        {relatedAttributes.map((attribute, index) => (
                                            <div key={index}>
                                                <ListItem sx={{ display: 'block' }}>
                                                    <label>{attribute}</label>
                                                </ListItem>
                                                <ListItem sx={{ display: 'grid', ml: 2 }}>
                                                    {firstAttribute.length !== 0 &&
                                                        <RadioGroup
                                                            onChange={(event) => handleAttributeSelected(event, attribute)}
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
                                    <FormHelperText className='formHelperTex'>Selecciona los atributos que deseas</FormHelperText>
                                </FormControl>
                            </Box>
                        </TableContainer>
                        <ItemCount product={product} selectedAttributes={attributesSelected} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

