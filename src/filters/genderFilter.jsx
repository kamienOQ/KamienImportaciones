import { List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React from 'react';
import { useAttributesStore, useProductsStore } from '../hooks';
import { useCategoriesStore } from '../hooks/useCategoriesStore';

export const GenderFilter = () => {

  const { startGetProductsByGender, genderFilter, setGenderFilter } = useAttributesStore();

  const { startGetProducts } = useProductsStore();

  const { categorySelected } = useCategoriesStore();

  // Función para asignar los filtros de hombre, mujer o niño
  const handleAlignment = (event, newAlignment) => {
    setGenderFilter(newAlignment);
    if (newAlignment === null) {
      startGetProducts(categorySelected);
    } else {
      startGetProductsByGender(newAlignment);
    }
  };

  return (

    <List sx={{ backgroundColor: '#f2f2f2' }}>
      <ListItem>
        <FilterAltIcon />
        <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Opciones de Busqueda</span>} sx={{ opacity: open ? 1 : 0 }} />
      </ListItem>

      {/* Botones para asignar el filtro de hombre mujer y niño */}
      <ToggleButtonGroup
        exclusive
        aria-label="text alignment"
        onChange={handleAlignment}
        sx={{ width: '100%', marginTop: 1, marginBottom: 1, color: 'tertiary.main', display: 'flex', flexDirection: 'column' }}
        value={genderFilter}

      >
        <ToggleButton value="Hombre" aria-label="left aligned" selectedcolor="#643A07" sx={{ gap: 2, width: '100%', color: 'black', display: 'flex' }}>
          <FaceIcon />
          Hombre
        </ToggleButton>
        <ToggleButton value="Mujer" aria-label="centered" selectedcolor="#643A07" sx={{ gap: 2, width: '100%', color: 'black', display: 'flex' }}>
          <Face3Icon />
          Mujer
        </ToggleButton>
        <ToggleButton value="Niños" aria-label="right aligned" selectedcolor="#643A07" sx={{ gap: 2, width: '100%', color: 'black', display: 'flex' }}>
          <ChildCareIcon />
          Niño
        </ToggleButton>
      </ToggleButtonGroup>
    </List>
  )
}

