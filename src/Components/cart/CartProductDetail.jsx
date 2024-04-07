import { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  ListItem,
  RadioGroup,
  Radio,
  TableContainer,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { CartItemCount } from './CartItemCount';

export const CartProductDetails = () => {
  const { activeProduct, activeCartProduct, isModalViewOpenCart } = useSelector(
    (state) => state.cart
  );

  const {
    name,
    price,
    relatedListAttributes: activeAttibutes,
  } = activeCartProduct;
  const { relatedAttributes, relatedListAttributes } = activeProduct;

  const [attributesSelected, setAttributesSelected] = useState(activeAttibutes);

  useEffect(() => {
    setAttributesSelected(activeAttibutes);
  }, [activeAttibutes])

  const handleAttributeSelected = (event, attribute) => {
    setAttributesSelected((prevState) => ({
      ...prevState,
      [attribute]: event.target.value,
    }));
  };

  return (
    <Dialog open={isModalViewOpenCart} align="center">
      <DialogContent>
        <div>
          <div className="product-form">
            <h1>{name}</h1>
            <h2 className="productsDetailCards-text">Precio: ₡{price}</h2>
            <TableContainer
              className="TableContainer"
              sx={{ maxHeight: "400px", overflow: "auto" }}
            >
              <Box sx={{ display: "flex" }}>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                >
                  <label component="legend">
                    Atributos relacionados al producto.
                  </label>
                  <FormGroup>
                    {relatedAttributes.map((attribute, index) => (
                      <div key={index}>
                        <ListItem sx={{ display: "block" }}>
                          <label>{attribute}</label>
                        </ListItem>
                        <ListItem sx={{ display: "grid", ml: 2 }}>
                          <RadioGroup
                            onChange={(event) =>
                              handleAttributeSelected(event, attribute)
                            }
                            defaultValue={activeAttibutes[attribute]}
                          >
                            {relatedListAttributes.map(
                              (relatedAttribute, index) =>
                                relatedAttribute.attributeSelected ===
                                  attribute && (
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
                                )
                            )}
                          </RadioGroup>
                        </ListItem>
                      </div>
                    ))}
                  </FormGroup>
                  <FormHelperText className='formHelperText'>Selecciona los atributos que deseas</FormHelperText>
                </FormControl>
              </Box>
            </TableContainer>
            <CartItemCount selectedAttributes={attributesSelected} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
