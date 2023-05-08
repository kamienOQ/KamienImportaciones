import { useEffect, useState } from 'react';
import { Avatar, Badge, Button, IconButton, ToggleButtonGroup} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import { useFiltersPageStore } from '../hooks/useFiltersPageStore';
import { useAboutStore } from '../hooks/useAboutStore';

const ToggleButton = styled(MuiToggleButton)(({ selectedcolor }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: selectedcolor,
  },
}));

export const MasterPage = ({ children }) => {
  // const { categoriesFilter, setCategoriesFilter, openCloseProductsFilter } = useFiltersPageStore();
  const { instagram, whatsapp, logo, startGetAbout } = useAboutStore();

  useEffect(() => {
    startGetAbout()
  }, [])
  
  //* Función para asignar los filtros de hombre, mujer o niño
  // const handleAlignment = (event, newAlignment) => {
  //   setCategoriesFilter(newAlignment);
  // };
  //* Función para abrir y cerrar el sidebar de filtros
  // const onHandleFilters = () => {
  //   openCloseProductsFilter();
  // };

  return (
    <div className="page-wrapper">
        <header className='header-navbar'>
            <div className='filter-products-container'>
              <IconButton sx={{ mr: 1 }} href="/categorias">
                <Avatar src = {logo}/>
              </IconButton>
              {/* Boton para abrir y cerrar el sidebar de filtros */}
              {/* {filterType === 'Products' && 
              <IconButton sx={{paddingY: 3}} to="/" onClick={onHandleFilters}>
                <FilterAltIcon color='quaternary'/>
              </IconButton>} */}
            </div>
            {/* Botones para asignar el filtro de hombre mujer y niño */}
            {/* {filterType === 'Categories' && (<ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              onChange={handleAlignment}
              sx={{marginTop: 1, marginBottom: 1, color: 'tertiary.main'}}
              value={categoriesFilter}
              
            >
              <ToggleButton value="hombre" aria-label="left aligned" selectedcolor="#643A07" sx={{color: 'black'}}> 
                HOMBRE
              </ToggleButton>
              <ToggleButton value="mujer" aria-label="centered" selectedcolor="#643A07" sx={{color: 'black'}}>
                MUJER
              </ToggleButton>
              <ToggleButton value="ninos" aria-label="right aligned" selectedcolor="#643A07" sx={{color: 'black'}}>
                NIÑOS
              </ToggleButton>
            </ToggleButtonGroup>)} */}

            <Button
              aria-controls="carrito-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Button>
        </header>
            {children}
        <footer className='footer'>
          <div className='footer-socialNetworks'>
            <div className='socialNetworks-background'>
              <a href={instagram}><InstagramIcon/></a>
            </div>
          </div>
          <div className='footer-contactInfo'>
            <div className='phoneNumber'>
              <LocalPhoneIcon sx={{fontSize: 'small'}}/>
              <p>{whatsapp}</p>
            </div>
              <a href="/Nosotros">Acerca de nosotros</a>
          </div>
          <div className='footer-copyright'>
            Todos los derechos reservados hasta 2024.
          </div>
        </footer>
    </div>
  )
}
