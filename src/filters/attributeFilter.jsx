import { Button,List, ListItem,ListItemButton,ListItemText,Checkbox, FormControlLabel, FormGroup, FormLabel} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import React from 'react';
import {useAttributesStore} from "../hooks";

export const AttributeFilter = (props) => {
  
    const { startGetAttributesByCategory,startGetProductsByAttributes,startGetProductsByGender} = useAttributesStore();
    const attributesList = [  
        {    name: "attribute1",    
        attributesRelated: ["relatedAttribute1", "relatedAttribute2"]
        },
        {
            name: "attribute2",
            attributesRelated: ["relatedAttribute3", "relatedAttribute4"]
        },
        {
            name: "attribute3",
            attributesRelated: ["relatedAttribute5", "relatedAttribute6","relatedAttribute7"]
        }
    ];


    function handleClick() {
        startGetAttributesByCategory();
        startGetProductsByAttributes();

    }

    return (

        <List >
            <ListItem>
                <FilterListIcon/>
                <ListItemText primary={"Filtrar por Atributos"} sx={{ opacity: open ? 1 : 0 }}/>
            </ListItem>
            <FormGroup>
            {attributesList.map((attribute, index) => (
                <div key={index}>
                    <ListItem  justifyContent="center"  sx={{ display: 'block' }}>  
                        <FormLabel>{attribute.name}</FormLabel>
                    </ListItem>
                    
                    <ListItem  justifyContent="center" sx={{ display: 'block' }}>
                        {attribute.attributesRelated.map((relatedAttribute, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox id={relatedAttribute} name={relatedAttribute} />}
                            label={relatedAttribute}
                        />
                        ))}
                    </ListItem>
                </div>
            ))}
            <Button variant="contained" onClick={handleClick}>
                Filtrar
            </Button>
            </FormGroup>
        </List>    
    )
}

