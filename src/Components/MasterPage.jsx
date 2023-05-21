import { useEffect } from 'react';
import { Alert, Avatar, IconButton, Snackbar, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useAboutStore } from '../hooks/useAboutStore';
import { Cart } from './cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { onSetAllProducts } from '../store/cart/cartSlice';
import { useNavigate } from 'react-router';
import { onChangeSuccess } from '../store/buying/buyingSlice';

// const ToggleButton = styled(MuiToggleButton)(({ selectedcolor }) => ({
//   '&.Mui-selected, &.Mui-selected:hover': {
//     color: 'white',
//     backgroundColor: selectedcolor,
//   },
// }));

export const MasterPage = ({ children }) => {
  const dispatch = useDispatch();
  // const { categoriesFilter, setCategoriesFilter, openCloseProductsFilter } = useFiltersPageStore();
  const { instagram, whatsapp, logo, startGetAbout } = useAboutStore();
  const { success } = useSelector((state) => state.buying);

  const navigate = useNavigate();

  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    if (cartProducts) {
      dispatch(onSetAllProducts(cartProducts));
    }
    startGetAbout();
  }, []);

  const redirectAbout = () => {
    navigate('/Nosotros')
  }

  const redirectCategories = () => {
    navigate('/categorias')
  }

  const onCloseBuyingSuccess = () => {
    dispatch(onChangeSuccess(false));
  }

  return (
    <div className="page-wrapper">
        <header className='header-navbar'>
            <div className='filter-products-container'>
              <IconButton sx={{ mr: 1 }} onClick={redirectCategories}>
                <Avatar src = {logo}/>
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                Kámien
              </Typography>
            </div>
            <Cart />
            
        </header>
            {children}
        <footer className='footer'>
          <div className='footer-socialNetworks'>
            <div className='socialNetworks-background'>
              <a href={instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon/></a>
            </div>
          </div>
          <div className='footer-contactInfo'>
            <div className='phoneNumber'>
              <LocalPhoneIcon sx={{fontSize: 'small'}}/>
              <p>{whatsapp}</p>
            </div>
              <a onClick={redirectAbout} className='redirectToAbout'>Acerca de nosotros</a>
          </div>
          <div className='footer-copyright'>
            Todos los derechos reservados hasta 2024.
          </div>
        </footer>
        <Snackbar open={success} onClose={onCloseBuyingSuccess} sx={{alignItems: "flex-start", mt: "42px"}} 
            anchorOrigin={{
            vertical: "top", 
            horizontal: "right"
          }}>
            <Alert onClose={onCloseBuyingSuccess} severity="success" variant="filled" sx={{ width: '100%'}}>
              El pedido ha sido realizado correctamente
            </Alert>
        </Snackbar>
    </div>
  )
}
