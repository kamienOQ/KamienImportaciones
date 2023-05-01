import { Button } from '@mui/material';
import React from 'react';
import {useAttributesStore} from "../hooks/";

export const HelloWorldApp = () => {
  
  const { startGetAttributesByCategory} = useAttributesStore();

  function handleClick() {
    startGetAttributesByCategory("Reloj");
  }

  return (      
    <Button variant="contained" onClick={handleClick}>
    Filtrar
    </Button>

      
  )
}

