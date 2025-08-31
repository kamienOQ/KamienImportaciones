import { Alert, Avatar, IconButton, Snackbar, ToggleButtonGroup, Typography } from '@mui/material';
import { Cart } from './cart/Cart';
import { collection, onSnapshot } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";
import { onChangeSuccess } from '../store/buying/buyingSlice';
import { onCloseError, onCloseSuccess, onSetAllProducts } from '../store/cart/cartSlice';
import { useAboutStore } from '../hooks/useAboutStore';
import { useAttributesStore } from '../hooks/useAttributesStore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import NoticeCookies from './Politic/NoticeCookies';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const MasterPage = ({ children }) => {
  const dispatch = useDispatch();
  const { instagram, facebook, whatsapp, logo, startGetAbout } = useAboutStore();
  const { success } = useSelector((state) => state.buying);
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.cart);
  const { isOpen } = useAttributesStore();

  useEffect(() => {
    let headerElement = document.getElementById('masterHeader');
    let footerElement = document.getElementById('masterFooter');
    if (headerElement.classList !== undefined && footerElement.classList !== undefined) {
      if (isOpen) {
        headerElement.classList.add("move-header");
        footerElement.classList.add("move-footer");
      } else {
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

  const redirectHome = () => {
    navigate('/')
  }

  const redirectTermsAndConditions = () => {
    navigate('/terms')
  }

  const redirectDevelopers = () => {
    navigate('/Desarrolladores')
  }

  const redirectPoliticsCookies = () => {
    navigate('/politica-cookies');
  }

  const redirectPrivacyPolitics = () => {
    navigate('/policy-politics');
  }

  const redirectContactInfo = () => {
    navigate('/contact-info');
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
          <IconButton sx={{ mr: 1 }} onClick={redirectHome}>
            <Avatar sx={{
              ml: -16,
              '@media (min-width: 200px)': {
                ml: "-24px",
                width: "40px",
                height: "40px",
              },
              '@media (min-width: 250px)': {
                ml: "-25px",
              },
              '@media (min-width: 300px)': {
                ml: "-25px",
                width: "45px",
                height: "45px",
              },
              '@media (min-width: 350px)': {
                ml: "-20px",
                width: "45px",
                height: "45px",
              },
              '@media (min-width: 400px)': {
                ml: "-20px",
              },
              '@media (min-width: 450px)': {
                ml: "-20px",
              },
              '@media (min-width: 500px)': {
                ml: "-18px",
                width: "48px",
                height: "48px",
              },
              '@media (min-width: 550px)': {
                ml: "-35px",
              },
              '@media (min-width: 600px)': {
                mr: "1px",
                ml: "-30px",
              },
              '@media (min-width: 601px)': {
                mr: "1px",
                ml: "-170px",
              },
              '@media (min-width: 650px)': {
                mr: "1px",
                ml: "-170px",
              },
              '@media (min-width: 1200px)': {
                mr: "-10px",
                ml: "-170px",
              },
            }}
              src={logo}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap component="div"
            className='filter-products-title'
            sx={{
              flexGrow: 1,
              mr: 5,
              '@media (min-width: 200px)': {
                ml: "-10px",
              },
              '@media (min-width: 250px)': {
                ml: "-10px",
              },
              '@media (min-width: 300px)': {
                ml: "-10px",
              },
              '@media (min-width: 350px)': {
                ml: "-8px",
              },
              '@media (min-width: 400px)': {
                ml: "-8px",
              },
              '@media (min-width: 450px)': {
                ml: "-8px",
              },
              '@media (min-width: 500px)': {
                ml: "-8px",
              },
              '@media (min-width: 550px)': {
                ml: "-8px",
              },
              '@media (min-width: 600px)': {
                ml: "-8px",
              },
              '@media (min-width: 601px)': {
                ml: "-68px",
              },
              '@media (min-width: 650px)': {
                ml: "-68px",
              },
              '@media (min-width: 1200px)': {
                ml: "-66px",
              },
            }}
          >
            ChayCR
          </Typography>
        </div>
        {/* <div className='filter-products-container-title'>
          <div className="col">
            <div className="row">
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="filter-products-subtitle"
                sx={{
                  flexGrow: 1,
                  mr: 5,
                  '@media (min-width: 200px)': {
                    ml: "-35px",
                    fontSize: "10px",
                  },
                  '@media (min-width: 250px)': {
                    ml: "-30px",
                    fontSize: "10px",
                  },
                  '@media (min-width: 300px)': {
                    ml: "-25px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 350px)': {
                    ml: "-40px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 400px)': {
                    ml: "-50px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 450px)': {
                    ml: "-100px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 500px)': {
                    ml: "-120px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 550px)': {
                    ml: "-35px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 600px)': {
                    ml: "-35px",
                    fontSize: "14px",
                  },
                  '@media (min-width: 1200px)': {
                    ml: "-35px",
                    fontSize: "15px",
                  },
                }}
              >
                Compra de manera
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className="filter-products-subtitle"
                sx={{
                  flexGrow: 1,
                  mr: 5,
                  '@media (min-width: 200px)': {
                    ml: "-35px",
                    fontSize: "10px",
                  },
                  '@media (min-width: 250px)': {
                    ml: "-30px",
                    fontSize: "10px",
                  },
                  '@media (min-width: 300px)': {
                    ml: "-25px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 350px)': {
                    ml: "-40px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 400px)': {
                    ml: "-50px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 450px)': {
                    ml: "-100px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 500px)': {
                    ml: "-125px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 550px)': {
                    ml: "-35px",
                    fontSize: "12px",
                  },
                  '@media (min-width: 600px)': {
                    ml: "-35px",
                    fontSize: "14px",
                  },
                  '@media (min-width: 1200px)': {
                    ml: "-35px",
                    fontSize: "15px",
                  },
                }}
              >
                fácil y segura
              </Typography>
            </div>
          </div>
        </div> */}
        <IconButton
          sx={{
            color: '#ffffff',
            '@media (min-width: 200px)': {
              ml: "-15px",
            },
            '@media (min-width: 250px)': {
              ml: "20px",
            },
            '@media (min-width: 300px)': {
              ml: "65px",
            },
            '@media (min-width: 350px)': {
              ml: "110px",
            },
            '@media (min-width: 400px)': {
              ml: "160px",
            },
            '@media (min-width: 450px)': {
              ml: "210px",
            },
            '@media (min-width: 500px)': {
              ml: "240px",
            },
            '@media (min-width: 550px)': {
              ml: "290px ",
            },
            '@media (min-width: 600px)': {
              ml: "320px",
            },
            '@media (min-width: 601px)': {
              ml: "310px",
            },
            '@media (min-width: 650px)': {
              ml: "390px",
            },
            '@media (min-width: 700px)': {
              ml: "440px",
            },
            '@media (min-width: 750px)': {
              ml: "490px",
            },
            '@media (min-width: 800px)': {
              ml: "540px",
            },
            '@media (min-width: 850px)': {
              ml: "590px",
            },
            '@media (min-width: 900px)': {
              ml: "640px",
            },
            '@media (min-width: 950px)': {
              ml: "690px",
            },
            '@media (min-width: 1000px)': {
              ml: "740px",
            },
            '@media (min-width: 1050px)': {
              ml: "790px",
            },
            '@media (min-width: 1100px)': {
              ml: "840px",
            },
            '@media (min-width: 1150px)': {
              ml: "890px",
            },
            // '@media (min-width: 1200px)': {
            //   ml: "940px",
            // },
            '@media (min-width: 1200px)': {
              ml: "970px",
            },
            '@media (min-width: 1250px)': {
              ml: "970px",
            },
            '@media (min-width: 1300px)': {
              ml: "1030px",
            },
            '@media (min-width: 1350px)': {
              ml: "1080px",
            },
            '@media (min-width: 1400px)': {
              ml: "1130px",
            },
            '@media (min-width: 1450px)': {
              ml: "1180px",
            },
            '@media (min-width: 1500px)': {
              ml: "1230px",
            },
            '@media (min-width: 1550px)': {
              ml: "1285px",
            },
            '@media (min-width: 1600px)': {
              ml: "1330px",
            },
            '@media (min-width: 1650px)': {
              ml: "1380px",
            },
            '@media (min-width: 1700px)': {
              ml: "1430px",
            },
            '@media (min-width: 1750px)': {
              ml: "1480px",
            },
            '@media (min-width: 1800px)': {
              ml: "1530px",
            },
            '@media (min-width: 1850px)': {
              ml: "1580px",
            },
            '@media (min-width: 1900px)': {
              ml: "1630px",
            },
            '@media (min-width: 1950px)': {
              ml: "1680px",
            },
            '@media (min-width: 2000px)': {
              ml: "1730px",
            },
          }}
        >
          <Cart />
        </IconButton>
      </header>
      {children}

      <footer id='masterFooter' className='footer'>
        <div className='footer-contactInfo'>
          <a onClick={redirectAbout} className='redirectToAbout'>Acerca de nosotros</a>
          <a onClick={redirectTermsAndConditions} className='redirectToAbout'>Términos y Condiciones</a>
          <a onClick={redirectPoliticsCookies} className='redirectToAbout'>Política de Cookies</a>
          <a onClick={redirectPrivacyPolitics} className='redirectToAbout'>Política de Privacidad</a>
          <a onClick={redirectContactInfo} className='redirectToAbout'>Contacto</a>
          <a onClick={redirectDevelopers} className='redirectToAbout'>Desarrolladores</a>
          <h4 style={{ marginTop: '15px' }}>Redes Sociales</h4>
          <div className='footer-socialNetworks'>
            <div className='socialNetworks-background'>
              <a href={instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon style={{ color: '#DE3163' }} /></a>
            </div>
            <div className='socialNetworks-background'>
              <a href={facebook} target="_blank" rel="noopener noreferrer"><FacebookIcon style={{ color: '#0000FF' }} /></a>
            </div>
            <div className='socialNetworks-background'>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon style={{ color: 'SeaGreen' }} /></a>
            </div>
          </div>
          <h4 style={{ marginTop: '15px', marginBottom: '5px' }}>
            <LocalPhoneIcon
              sx={{
                fontSize: 'small',
                '@media (min-width: 200px)': {
                  width: '15px',
                  height: '15px',
                  marginRight: '10px',
                },
                '@media (min-width: 550px)': {
                  width: '20px',
                  height: '20px',
                  marginRight: '10px',
                },
                '@media (min-width: 1200px)': {
                  width: '22px',
                  height: '22px',
                  marginRight: '10px',
                },
              }}
            />
            71095580
          </h4>
        </div>
        <div className='footer-copyright'>
          Todos los derechos reservados hasta 2024.
        </div>
      </footer>

      <Snackbar open={message.error} autoHideDuration={6000} onClose={onCloseMessageError} sx={{ alignItems: "flex-start", mt: "42px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>
        <Alert onClose={onCloseMessageError} severity="error" variant="filled" sx={{ width: '100%' }}>
          Ya existe un producto en el carrito con los mismos atributos
        </Alert>
      </Snackbar>

      <Snackbar open={message.success} autoHideDuration={6000} onClose={onCloseMessageSuccess} sx={{ alignItems: "flex-start", mt: "42px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>
        <Alert onClose={onCloseMessageSuccess} severity="success" variant="filled" sx={{ width: '100%' }}>
          El producto del carrito ha sido actualizado correctamente
        </Alert>
      </Snackbar>

      <Snackbar open={success} onClose={onCloseBuyingSuccess} sx={{ alignItems: "flex-start", mt: "42px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>
        <Alert onClose={onCloseBuyingSuccess} severity="success" variant="filled" sx={{ width: '100%' }}>
          El pedido ha sido realizado correctamente
        </Alert>
      </Snackbar>
      <NoticeCookies />
    </div>
  )
}
