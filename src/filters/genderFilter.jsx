import { Button, Dialog, DialogTitle,DialogContent ,List, ListItem,ListItemButton,ListItemText,} from '@mui/material';
import Chip from '@mui/material/Chip';
import React from 'react';
import {useAttributesStore} from "../hooks";

export const HelloWorldApp = () => {
  
  const { startGetAttributesByCategory,startGetProductsByAttributes,startGetProductsByGender} = useAttributesStore();
  const attributesList = ["attribute1", "attribute2", "attribute3"];

  function handleClick() {
    startGetAttributesByCategory();
    startGetProductsByAttributes();

  }
  const maleClick = () =>  {
    startGetProductsByGender("Hombre");

  }
  const femaleClick = () =>  {
    startGetProductsByGender("Mujer");

  }
  const childClick = () =>  {
    startGetProductsByGender("Niño");

  }

  return (

    <List >
      <ListItem key= "Niño" disablePadding sx={{ display: 'black' }}>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  minHeight: 48,
                }}
                onClick={childClick}
              >
                <ListItemText
                  primary={"Niño"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
      </ListItem>
      
      <ListItem key= "Mujer" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={femaleClick}
              >
                <ListItemText
                  primary={"Mujer"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
      </ListItem>

      <ListItem key= "Hombre" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={maleClick}
              >
                <ListItemText
                  primary={"Hombre"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
      </ListItem>

        
        <div>
          <Button variant="contained" onClick={handleClick}>
          Filtrar
          </Button> 
        </div>
     </List>
    

    

      
  )
}

