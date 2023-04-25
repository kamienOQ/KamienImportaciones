import { useEffect, useState } from 'react';
import { Avatar, IconButton, ToggleButtonGroup} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import logo from '../assets/logo.png'
import { useMasterPageStore } from '../hooks/useMasterPageStore';
import { useAboutStore } from '../hooks/useAboutStore';

const ToggleButton = styled(MuiToggleButton)(({ selectedcolor }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: selectedcolor,
  },
}));

export const MasterPage = ({filterType}) => {
  const { categoriesFilter, setCategoriesFilter, openCloseProductsFilter } = useMasterPageStore();
  const { instagram, whatsapp, startGetAbout } = useAboutStore();

  useEffect(() => {
    startGetAbout()
  }, [])
  
  const handleAlignment = (event, newAlignment) => {
    setCategoriesFilter(newAlignment);
  };

  const onHandleFilters = () => {
    openCloseProductsFilter();
  };

  return (
    <div className="page-wrapper">
        <header className='header-navbar'>
            <div className='filter-products-container'>
              <IconButton sx={{ mr: 1 }} to="/">
                <Avatar src = {logo}/>
              </IconButton>
              {filterType === 'Products' && 
              <IconButton sx={{paddingY: 3}} to="/" onClick={onHandleFilters}>
                <FilterAltIcon color='quaternary'/>
              </IconButton>}
            </div>

            {filterType === 'Categories' && (<ToggleButtonGroup
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
            </ToggleButtonGroup>)}
            <div className='navbar-shoppingCar'>
              <ShoppingCartIcon color='quaternary' sx={{marginTop: 2}}/>
              <div className='badge'>
                <span className='span-icon'>1</span>
              </div>
            </div>
        </header>

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
              <a href="/">Acerca de nosotros</a>
          </div>
          <div className='footer-copyright'>
            Todos los derechos reservados hasta 2024.
          </div>
        </footer>
    </div>
  )
}
