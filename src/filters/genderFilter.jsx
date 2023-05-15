import { Button, Dialog, DialogTitle,DialogContent ,List, ListItem,ListItemButton,ListItemText,} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React from 'react';
import {useAttributesStore} from "../hooks";

export const GenderFilter = () => {
  
  const {startGetProductsByGender} = useAttributesStore();
  

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

    <List  sx={{ backgroundColor: '#f2f2f2' }}>
      <ListItem>
      <FilterAltIcon/>
      <ListItemText primary={<span style={{fontWeight: 'bold'}}>Opciones de Busqueda</span>} sx={{ opacity: open ? 1 : 0}}/>
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
                  sx={{ opacity: open ? 1 : 0, ml: 2}}
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
                  sx={{ opacity: open ? 1 : 0, ml: 2 }}
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
                  sx={{ opacity: open ? 1 : 0, ml: 2 }}
                />
              </ListItemButton>
      </ListItem>
    </List>
    

    

      
  )
}

