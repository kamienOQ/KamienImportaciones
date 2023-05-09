import { Button } from '@mui/material';
import React from 'react';
import {useAttributesStore} from "../hooks/";

export const HelloWorldApp = () => {
  
  const { startGetAttributesByCategory,startGetProductsByAttributes} = useAttributesStore();
  const attributesList = ["attribute1", "attribute2", "attribute3"];

  function handleClick() {
    startGetAttributesByCategory();
    startGetProductsByAttributes();
  }

  return (      
    <Button variant="contained" onClick={handleClick}>
    Filtrar
    </Button>

      
  )
}

