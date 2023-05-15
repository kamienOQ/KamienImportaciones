import { Button,List, ListItem,ListItemButton,ListItemText,Checkbox, FormControlLabel, FormGroup, FormLabel} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import React from 'react';
import { useState } from 'react';
import {useAttributesStore} from "../hooks";

export const AttributeFilter = () => {
    const [attributesSelected, writeAttributesSelected] = useState([]);
    const { startGetAttributesByCategory,startGetProductsByAttributes, setAttributesSelected,getAttributes} = useAttributesStore();
    const attributesList = [  
        {    attributeName: "attribute1",    
        attributesRelated: ["relatedAttribute1", "relatedAttribute2"]
        },
        {
            attributeName: "attribute2",
            attributesRelated: ["relatedAttribute3", "relatedAttribute4"]
        },
        {
            attributeName: "attribute3",
            attributesRelated: ["relatedAttribute5", "relatedAttribute6","relatedAttribute7"]
        }
    ];

    




    function handleClick() {
        //console.log(getAttributes);
        setAttributesSelected(attributesSelected);
        //startGetProductsByAttributes();
    }

    function handleAttributeSelected(event) {
        const { id, checked } = event.target;
        if (checked) {
            writeAttributesSelected([...attributesSelected, id]); // agregar el atributo seleccionado al estado
        } else {
            writeAttributesSelected(attributesSelected.filter(attribute => attribute !== id)); // quitar el atributo seleccionado del estado
        }
    }



    return (

        <List >
            <ListItem>
                <ListItemText primary={"Filtrar por Atributos"} sx={{ opacity: open ? 1 : 0 }}/>
            </ListItem>
            <FormGroup>
            {attributesList.map((attribute, index) => (
                <div key={index}>
                    <ListItem  sx={{ display: 'block'}}>  
                        <FormLabel>{attribute.attributeName}</FormLabel>
                    </ListItem>
                    
                    <ListItem   sx={{ display: 'block', justifyContent:"center", ml: 2}}>
                        {attribute.attributesRelated.map((relatedAttribute, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox id={relatedAttribute} name={relatedAttribute} onChange={handleAttributeSelected}/>}
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

