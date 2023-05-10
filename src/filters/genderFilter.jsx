import { Button, Dialog, DialogTitle,DialogContent ,List, ListItem,ListItemButton,ListItemText,} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React from 'react';
import {useAttributesStore} from "../hooks";

export const HelloWorldApp = () => {
  
  const { startGetAttributesByCategory,startGetProductsByAttributes,startGetProductsByGender} = useAttributesStore();
  const attributesList = ["attribute1", "attribute2", "attribute3"];

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
      <ListItem>
      <FilterAltIcon/>
      <ListItemText primary={"Opciones de Filtrado"} sx={{ opacity: open ? 1 : 0 }}/>
      </ListItem>
      
      <ListItem key= "Niño" disablePadding sx={{ display: 'black' }}>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  minHeight: 48,
                }}
                onClick={childClick}
              >
                <ChildCareIcon/>
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
                <Face3Icon/>
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
                
                <FaceIcon />
                <ListItemText
                  primary={"Hombre"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
      </ListItem>
    </List>
    

    

      
  )
}

