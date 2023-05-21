import { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { Alert, Avatar, Badge, Button, IconButton, Snackbar, ToggleButtonGroup, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useAboutStore } from '../hooks/useAboutStore';
import { Cart } from './cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { onChangeSuccess } from '../store/buying/buyingSlice';
import { FirebaseDB } from "../firebase/config";
import { onCloseError, onCloseSuccess, onSetAllProducts } from '../store/cart/cartSlice';
import { useAttributesStore } from '../hooks/useAttributesStore';

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
  const { message } = useSelector((state) => state.cart);

  const { isOpen } = useAttributesStore();

  useEffect(() => {
    let headerElement = document.getElementById('masterHeader');
    let footerElement = document.getElementById('masterFooter');
    if(headerElement.classList !== undefined && footerElement.classList !== undefined){
      if(isOpen){
        headerElement.classList.add("move-header");
        footerElement.classList.add("move-footer");
      }else{
        headerElement.classList.remove("move-header");
        footerElement.classList.remove("move-footer");
      }
    }
  }, [isOpen])
  

  useEffect(() => {
    const productsRef = collection(FirebaseDB, '/products');

    const unsubscribe = onSnapshot(productsRef, (querySnapshot) => {
      let type;
      const modifiedProducts = querySnapshot.docChanges().map((change) => {
        type = change.type;
        return change.doc.data();
      });

      const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      if (cartProducts) {
        let updatedCartProducts = [];
        if (type === 'removed') {
          updatedCartProducts = cartProducts.filter((cartProduct) => {
            return modifiedProducts.some((modified) => modified.date !== cartProduct.date);
          });
        } else {
          updatedCartProducts = cartProducts.reduce((accumulator, cartProduct) => {
            const modifiedProduct = modifiedProducts.find((modified) => modified.date === cartProduct.date);
            if (modifiedProduct) {
              if (modifiedProduct.active === false) {
                // El producto ha sido desactivado, no se incluirá en el carrito
                return accumulator;
              }
              // Válida si ningún atributo del producto del carrito a cambiado
              let equalAttributes = true
              for (let attribute in cartProduct.relatedListAttributes) {
                const equalAttribute = modifiedProduct.relatedListAttributes.filter(attributeM => attributeM.attributeSelected === attribute && attributeM.feature === cartProduct.relatedListAttributes[attribute]);
                if (equalAttribute.length === 0) {
                  equalAttributes = false;
                }
              }
              if (!equalAttributes) {
                return accumulator;
              }
              const tempProduct = {
                ...cartProduct,
                date: modifiedProduct.date,
                name: modifiedProduct.productName,
                image: modifiedProduct.image.url,
                price: modifiedProduct.price,
              };
              return [...accumulator, tempProduct];
            } else if (type === 'added' && modifiedProducts.length > 1) {
              return accumulator;
            }
            return [...accumulator, cartProduct];
          }, []);
        }
        dispatch(onSetAllProducts(updatedCartProducts));
        localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
      }
    });

    startGetAbout();

    return () => {
      unsubscribe();
    };
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

  const onCloseMessageError = () => {
    dispatch(onCloseError());
  }

  const onCloseMessageSuccess = () => {
    dispatch(onCloseSuccess());
  }

  return (
    <div className="page-wrapper">
        <header id="masterHeader" className='header-navbar'>
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
        <footer id='masterFooter' className='footer'>
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
        <Snackbar open={message.error} autoHideDuration={6000} onClose={onCloseMessageError} sx={{alignItems: "flex-start", mt: "42px"}} 
          anchorOrigin={{
          vertical: "top", 
          horizontal: "right"
        }}>
          <Alert onClose={onCloseMessageError} severity="error" variant="filled" sx={{ width: '100%'}}>
            Ya existe un producto en el carrito con los mismos atributos
          </Alert>
        </Snackbar>
        
        <Snackbar open={message.success} autoHideDuration={6000} onClose={onCloseMessageSuccess} sx={{alignItems: "flex-start", mt: "42px"}} 
            anchorOrigin={{
            vertical: "top", 
            horizontal: "right"
          }}>
            <Alert onClose={onCloseMessageSuccess} severity="success" variant="filled" sx={{ width: '100%'}}>
              El producto del carrito ha sido actualizado correctamente
            </Alert>
        </Snackbar>

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
