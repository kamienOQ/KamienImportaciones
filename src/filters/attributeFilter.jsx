import { Button,List, ListItem,ListItemButton,ListItemText,Checkbox, FormControlLabel, FormGroup, FormLabel} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import {useAttributesStore, useProductsStore} from "../hooks";
import { useCategoriesStore } from '../hooks/useCategoriesStore';
import { cartSlice } from '../store/cart/cartSlice';

export const AttributeFilter = () => {
    const { startGetProductsByAttributes, setAttributesSelected, setAttributesFilter, attributesFilter, deleteAttributesFilter,attributes} = useAttributesStore();
    const { startGetProducts } = useProductsStore();
    const { categorySelected } = useCategoriesStore();

    function handleClick() {
        if(attributesFilter.length === 0){
            startGetProducts(categorySelected);
        }else{
            setAttributesSelected(attributesFilter);
            startGetProductsByAttributes();
        }
    }

    function handleAttributeSelected(event) {
        const { id, checked } = event.target;
        if (checked) {
            // writeAttributesSelected([...attributesSelected, id]); // agregar el atributo seleccionado al estado
            setAttributesFilter(id);
        } else {
            // writeAttributesSelected(attributesSelected.filter(attribute => attribute !== id)); // quitar el atributo seleccionado del estado
            deleteAttributesFilter(id);
        }
    }


    return (

        <List >
            <ListItem>
                <ListItemText primary={"Filtrar por Atributos"} sx={{ opacity: open ? 1 : 0 }}/>
            </ListItem>
            <FormGroup>
                {attributes?.map((attribute, index) => (
                    attribute.attributeName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== 'genero' &&
                    <div key={index}>
                        <ListItem  sx={{ display: 'block'}}>  
                            <FormLabel>{attribute.attributeName}</FormLabel>
                        </ListItem>
                        
                        <ListItem sx={{ display: 'block', justifyContent:"center", ml: 2}}>
                            {attribute.attributesRelated.map((relatedAttribute, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox id={relatedAttribute} name={relatedAttribute} onChange={handleAttributeSelected}/>}
                                label={relatedAttribute}
                                checked={attributesFilter.includes(relatedAttribute)? true : false}
                            />
                            ))}
                        </ListItem>
                    </div>
            ))}
            <Button sx={{ backgroundColor: 'filter.main', color: 'tertiary.main' }} variant="contained" onClick={handleClick}>
                Filtrar
            </Button>
            </FormGroup>
        </List>    
    )
}