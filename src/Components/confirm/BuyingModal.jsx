import './BuyingModal.css';
import { crearPedido } from '../../firebase/providers';
import { FaRegFaceSadCry } from "react-icons/fa6";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Modal, Box, Button, Table, TextField, TableContainer, MenuItem, TableHead, TableCell, TableRow, TableBody, Typography, InputLabel, Select, FormControl } from '@mui/material'
import { onChangeSuccess } from '../../store/buying/buyingSlice';
import { onCleanProducts } from '../../store/cart/cartSlice';
import { useAboutStore } from '../../hooks/useAboutStore';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';
import GppBadIcon from '@mui/icons-material/GppBad';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from 'react-router-dom';
import PaymentPayPal from './PaymentPayPal';

const BuyingModal = ({ open, setOpen, datosCompra }) => {
  const { whatsapp } = useAboutStore();
  const [unitaryPricetotal, setunitaryPriceTotal] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [name, setname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [envio, setenvio] = useState("");
  const [mensajeEnvio, setMensajeEnvio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [disable, setdisable] = useState(false);
  const [position, setPosition] = useState(undefined);
  const [markerPosition, setMarkerPosition] = useState(undefined);
  const [camposCompletos, setCamposCompletos] = useState(false);
  const mapRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Generar un número aleatorio entre 1 y 10,000
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomNumber = getRandomInt(1, 10000);

  let orderNumber = randomNumber;

  const apiuser = import.meta.env.VITE_TILOPAY_API_USER;
  const apiPassword = import.meta.env.VITE_TILOPAY_API_PASSWORD;
  const key = import.meta.env.VITE_TILOPAY_API_KEY;

  const SendMessage = async () => {
    let fecha = new Date();
    const data = {
      address: direccion,
      cellphone: numero,
      date: fecha.getTime(),
      name: name,
      lastName: lastName,
      nameLowerCase: name.toLowerCase(),
      lastNameLowerCase: lastName.toLowerCase(),
      email: email,
      status: "Pendiente",
      wayToPay: metodoPago,
      sendMethod: envio,
      products: datosCompra,
      totalPrice: calculateTotal()
    };

    // Obtener el número de teléfono de la URL de WhatsApp
    const phoneNumber = whatsapp.match(/\+\d+/)[0];
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensajeEnvio + `https://www.google.com/maps?q=${markerPosition[0]},${markerPosition[1]}`)}&phone=${phoneNumber}`
    window.open(url);
    setNumero("")
    setname("")
    setLastName("")
    setEmail("")
    setDireccion("")
    setenvio("")
    setMetodoPago("")
    setdisable(false)
    setOpen(!open)
    await crearPedido(data);
    dispatch(onChangeSuccess(true));
    dispatch(onCleanProducts());
  };


  const linkPaypalMe = `https://paypal.me/pagosKamien?country.x=CR&locale.x=es_XC`;

  const SendPaypalLink = async () => {
    let fecha = new Date();
    const data = {
      address: direccion,
      cellphone: numero,
      date: fecha.getTime(),
      name: name,
      nameLowerCase: name.toLowerCase(),
      lastName: lastName,
      lastNameLowerCase: lastName.toLowerCase(),
      email: email,
      status: "Pendiente",
      wayToPay: linkPaypalMe,
      sendMethod: envio,
      products: datosCompra,
      totalPrice: calculateTotal(),
    };

    // Obtener el número de teléfono de la URL de WhatsApp
    const phoneNumber = whatsapp.match(/\+\d+/)[0];
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensajeEnvio + `https://www.google.com/maps?q=${markerPosition[0]},${markerPosition[1]}`)}&phone=${phoneNumber}`
    window.open(url);
    setNumero("")
    setname("")
    setLastName("")
    setEmail("")
    setDireccion("")
    setenvio("")
    setMetodoPago("")
    setdisable(false)
    setOpen(!open)
    await crearPedido(data);
    dispatch(onChangeSuccess(true));
    dispatch(onCleanProducts());
  }

  // Crear new payment method Tilopay
  const SendTilopayLink = async () => {
    // Get token
    try {
      // Realize the POST request to obtain the token
      const response = await fetch('https://app.tilopay.com/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiuser: apiuser,
          password: apiPassword
        }),
        redirect: 'follow'
      });

      // Verify if the request was successful
      if (!response.ok) {
        throw new Error('Error en la solicitud: ${response.statusText}');
      }

      const data = await response.json();
      // Here we have the token
      const token = data.access_token;

      if (!token) {
        throw new Error('No se ha recibido un token válido');
      }

      // Now we can take the token is time to payment process
      const paymentResponse = await fetch('https://app.tilopay.com/api/v1/processPayment', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redirect: 'http://localhost:5173/ThankYouBuyer',
          key: key,
          amount: calculateTotal(),
          currency: 'CRC',
          billToFirstName: name,
          billToLastName: lastName,
          billToAddress: direccion,
          billToAddress2: direccion,
          billToCity: direccion,
          billToState: direccion,
          billToZipPostCode: direccion,
          billToCountry: 'CR',
          billToTelephone: numero,
          billToEmail: email,
          orderNumber: orderNumber,
          capture: '1',
          subscription: '0',
          platform: 'Kamien Store'
        }),
        redirect: 'follow'
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(`Error en la respuesta del pago: ${paymentResponse.statusText}`);
      }

      // Redirect to payment link
      if (paymentData.url) {
        window.location.href = paymentData.url;
      }

    } catch (error) {
      console.error('Error al iniciar el pago: ', error);
    }

    let fecha = new Date();
    const data = {
      address: direccion,
      cellphone: numero,
      date: fecha.getTime(),
      name: name,
      lastName: lastName,
      nameLowerCase: name.toLowerCase(),
      lastNameLowerCase: lastName.toLowerCase(),
      email: email,
      status: "Pendiente",
      wayToPay: metodoPago,
      sendMethod: envio,
      products: datosCompra,
      totalPrice: calculateTotal()
    };

    // Obtener el número de teléfono de la URL de WhatsApp
    const phoneNumber = whatsapp.match(/\+\d+/)[0];
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensajeEnvio + `https://www.google.com/maps?q=${markerPosition[0]},${markerPosition[1]}`)}&phone=${phoneNumber}`
    window.open(url);
    setNumero("")
    setname("")
    setLastName("")
    setEmail("")
    setDireccion("")
    setenvio("")
    setMetodoPago("")
    setdisable(false)
    setOpen(!open)
    await crearPedido(data);
  };

  // const confirmPaymend = () => {
  //   navigate('/PaymenCard')
  // };

  const checkNull = () => {
    if (numero.length < 7 || envio === "" || metodoPago === "" || name.length < 4 || lastName.length < 4 || direccion.length < 4) {
      setdisable(false)
    } else {
      setdisable(true)
    }
  };

  const calculateTotal = () => {
    const total = datosCompra.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return total;
  };

  const manageMsg = () => {
    setMensajeEnvio(
      "Compra Kámien" +
      "\n Nombre: " + name +
      "\n Apellidos: " + lastName +
      "\n Email: " + email +
      "\n Método de pago: " + metodoPago +
      "\n Método de envío: " + envio +
      "\n Número de teléfono: " + numero +
      "\n Precio Total de la compra: " + calculateTotal() +
      "\n Dirección: " + direccion +
      "\n Total de Artículos: \n" +
      datosCompra.map((row) => {
        let fila = "x" + row.quantity + "   " + row.name + " " + row.lastName + " " + row.email + " " + Object.keys(row.relatedListAttributes).map((key) => {
          return " " + row.relatedListAttributes[key]
        }
        )
          + "                " + row.price * row.quantity + "\n"
        return fila
      })
      + "\n Ubicación: "
    )
  };

  const handleMetodoPago = (event) => {
    setMetodoPago(event.target.value)
    manageMsg()
    checkNull()
  };

  const handleMetodoEnvio = (event) => {
    setenvio(event.target.value)
    manageMsg()
    checkNull()
  };

  const handleDireccion = (event) => {
    // Verificar si el campo de nombre está lleno
    if (event.target.value.trim() === '') {
      setCamposCompletos(true);
    } else {
      setCamposCompletos(false);
    }

    setDireccion(event.target.value)
    manageMsg()
    checkNull()
  };

  const handleName = (event) => {
    // Verificar si el campo de nombre está lleno
    if (event.target.value.trim() === '') {
      setCamposCompletos(true);
    } else {
      setCamposCompletos(false);
    }

    setname(event.target.value)
    manageMsg()
    checkNull()
  };

  const handleLastName = (event) => {
    // Verificar si el campo de apellido está lleno
    if (event.target.value.trim() === '') {
      setCamposCompletos(true);
    } else {
      setCamposCompletos(false);
    }

    setLastName(event.target.value)
    manageMsg()
    checkNull()
  };

  const handleEmail = (event) => {
    // Verificar si el campo de correo está lleno
    if (event.target.value.trim() === '') {
      setCamposCompletos(true);
    } else {
      setCamposCompletos(false);
    }

    setEmail(event.target.value)
    manageMsg()
    checkNull()
  };
  ;

  const handleNumber = (event) => {
    // Verificar si el campo de nombre está lleno
    if (event.target.value.trim() === '') {
      setCamposCompletos(true);
    } else {
      setCamposCompletos(false);
    }

    const regex = /^[0-9\b]+$/;
    if (regex.test(event.target.value)) {
      setNumero(event.target.value)
      manageMsg()
      checkNull()
    }
  };

  const handleClose = () => {
    setOpen(!open)
  };

  useEffect(() => {
    const add = (accumulator, a) => {
      return accumulator + a;
    }
    const getunitaryPriceTotal = () => {
      let price_array = datosCompra.map((row) => {
        let unitaryPrice_total = 0
        unitaryPrice_total = (unitaryPrice_total + row.unitaryPrice) * row.quantity
        return unitaryPrice_total
      })
      setunitaryPriceTotal(price_array.reduce(add, 0))
    }
    getunitaryPriceTotal()
  }, []);

  const handleMarkerDrag = (e) => {
    setMarkerPosition([e.target._latlng.lat, e.target._latlng.lng])
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude])
      setMarkerPosition([position.coords.latitude, position.coords.longitude]);
    });
    checkNull()
  }, []);

  useEffect(() => {
    if (mapRef.current && position) {
      mapRef.current.flyTo(position, mapRef.current.getZoom(), {
        duration: 1
      });
    }
  }, [position]);

  let fecha = new Date();
  const dataInfoBuyer = {
    address: direccion,
    cellphone: numero,
    date: fecha.getTime(),
    name: name,
    nameLowerCase: name.toLowerCase(),
    lastName: lastName,
    lastNameLowerCase: lastName.toLowerCase(),
    email: email,
    status: "Pendiente",
    wayToPay: metodoPago,
    sendMethod: envio
  };

  if (datosCompra?.length === 0) {
    return (
      <Modal open={open} onClose={handleClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{
          width: "25%",
          height: "25%",
          background: "white",
          border: "2px solid gray",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          '@media (min-width: 200px)': {
            width: "280px",
          },
          '@media (min-width: 280px)': {
            width: "220px",
          },
          '@media (min-width: 400px)': {
            width: "320px",
          },
          '@media (min-width: 500px)': {
            width: "400px",
          },
          '@media (min-width: 700px)': {
            width: "460px",
          },
          '@media (min-width: 820px)': {
            width: "460px",
          },
          '@media (min-width: 912px)': {
            width: "460px",
          },
          '@media (min-width: 1024px)': {
            width: "570px",
          },
          '@media (min-width: 1060px)': {
            width: "670px",
          }
        }}>
          <GppBadIcon sx={{ marginRight: "5%" }} />
          <Typography sx={{ fontWeight: "bolder" }}>
            <FaRegFaceSadCry color="blue" /> No Hay Productos en el carrito
          </Typography>
        </Box>
      </Modal>
    )
  };

  return (
    <>
      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            background: "#F2F3F4",
            color: "black",
            borderRadius: "20px",
            '@media (min-width: 200px)': {
              width: "250px",
              height: "600px !important",
              overflowY: "auto"
            },
            '@media (min-width: 240px)': {
              width: "250px",
              height: "300px !important",
              overflowY: "auto"
            },
            '@media (min-width: 280px) and (min-height: 500px)': {
              width: "400px",
              height: "700px !important",
              overflowY: "auto"
            },
            '@media (min-width: 280px) and (min-height: 800px)': {
              width: "350px",
              height: "790px !important",
              overflowY: "auto"
            },
            '@media (min-width: 320px)': {
              width: "345px",
              height: "500px !important",
              overflowY: "auto"
            },
            '@media (min-width: 360px) and (min-height: 100px)': {
              width: "345px",
              height: "580px !important",
              overflowY: "auto"
            },
            '@media (min-width: 360px) and (min-height: 700px)': {
              width: "345px",
              height: "660px !important",
              overflowY: "auto"
            },
            '@media (min-width: 375px) and (min-height: 600px)': {
              width: "360px",
              height: "590px !important",
              overflowY: "auto"
            },
            '@media (min-width: 375px) and (min-height: 800px)': {
              width: "360px",
              height: "720px !important",
              overflowY: "auto"
            },
            '@media (min-width: 376px) and (min-height: 600px)': {
              width: "360px",
              height: "750px !important",
              overflowY: "auto"
            },
            '@media (min-width: 384px) and (min-height: 600px)': {
              width: "330px",
              height: "600px !important",
              overflowY: "auto"
            },
            '@media (min-width: 402px) and (min-height: 800px)': {
              width: "385px",
              height: "750px !important",
              overflowY: "auto"
            },
            '@media (min-width: 412px) and (min-height: 800px)': {
              width: "385px",
              height: "800px !important",
              overflowY: "auto"
            },
            '@media (min-width: 414px) and (min-height: 800px)': {
              width: "385px",
              height: "780px !important",
              overflowY: "auto"
            },
            '@media (min-width: 540px)': {
              width: "480px",
              height: "600px !important",
              overflowY: "auto"
            },
            '@media (min-width: 600px) and (min-height: 900px)': {
              width: "580px",
              height: "810px !important",
              overflowY: "auto"
            },
            '@media (min-width: 640px)': {
              width: "580px",
              height: "1000px !important",
              overflowY: "auto"
            },
            '@media (min-width: 768px)': {
              width: "650px",
              height: "710px !important",
              overflowY: "auto"
            },
            '@media (min-width: 768px) and (min-height: 1000px)': {
              width: "650px",
              height: "920px !important",
              overflowY: "auto"
            },
            '@media (min-width: 800px) and (min-height: 1000px)': {
              width: "730px",
              height: "710px !important",
              overflowY: "auto"
            },
            '@media (min-width: 800px) and (min-height: 1200px)': {
              width: "730px",
              height: "990px !important",
              overflowY: "auto"
            },
            '@media (min-width: 820px) and (min-height: 1000px)': {
              width: "730px",
              height: "910px !important",
              overflowY: "auto"
            },
            '@media (min-width: 820px) and (min-height: 1200px)': {
              width: "730px",
              height: "1150px !important",
              overflowY: "auto"
            },
            '@media (min-width: 912px) and (min-height: 600px)': {
              width: "800px",
              height: "620px !important",
              overflowY: "auto"
            },
            '@media (min-width: 912px) and (min-height: 1000px)': {
              width: "800px",
              height: "1250px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1024px) and (min-height: 600px)': {
              width: "800px",
              height: "550px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1024px) and (min-height: 601px)': {
              width: "800px",
              height: "550px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1024px) and (min-height: 800px)': {
              width: "890px",
              height: "700px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1024px) and (min-height: 1200px)': {
              width: "800px",
              height: "1210px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1100px) and (min-height: 800px)': {
              width: "960px",
              height: "740px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1100px) and (min-height: 1100px)': {
              width: "960px",
              height: "940px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1300px) and (min-height: 900px)': {
              width: "1000px",
              height: "950px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1400px) and (min-height: 900px)': {
              width: "1000px",
              height: "800px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1400px) and (min-height: 100px)': {
              width: "1000px",
              height: "900px !important",
              overflowY: "auto"
            },
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <h2 style={{ marginLeft: "5%" }}>
              Confirmar Pedido
            </h2>
            <Button
              sx={{
                color: "white",
                background: "#2E4053",
                marginRight: "5%",
                minWidth: "30px",
                height: "30px",
                marginTop: "1%",
                '&:hover': {
                  background: "#ABB2B9"
                }
              }}
              onClick={handleClose}
            >
              <ClearIcon />
            </Button>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
              <Box sx={{ width: "80%" }}>
                <h3>Datos personales</h3>
                <div
                  className='MetodoDePago'
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <AccountCircle sx={{ color: 'action.active', marginRight: '5px' }} />
                  <TextField
                    color='quaternary'
                    id="input-with-sx"
                    label="Nombre"
                    variant="filled"
                    onChange={(e) => handleName(e)}
                    fullWidth
                    sx={{
                      fontSize: "small"
                    }}
                    inputlabelprops={{
                      style: { fontSize: "x-small" }
                    }}
                    inputProps={{ maxLength: 50 }}
                    value={name}
                  />
                </div>

                <div
                  className='MetodoDePago'
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <AccountCircle sx={{ color: 'action.active', marginRight: '5px' }} />
                  <TextField
                    color='quaternary'
                    id="input-with-sx"
                    label="Apellidos"
                    variant="filled"
                    onChange={(e) => handleLastName(e)}
                    fullWidth
                    sx={{
                      fontSize: "small"
                    }}
                    inputlabelprops={{
                      style: { fontSize: "x-small" }
                    }}
                    inputProps={{ maxLength: 50 }}
                    value={lastName}
                  />
                </div>

                <div
                  className='MetodoDePago'
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <AccountCircle sx={{ color: 'action.active', marginRight: '5px' }} />
                  <TextField
                    color='quaternary'
                    id="input-with-sx"
                    label="Email"
                    variant="filled"
                    onChange={(e) => handleEmail(e)}
                    fullWidth
                    sx={{
                      fontSize: "small"
                    }}
                    inputlabelprops={{
                      style: { fontSize: "x-small" }
                    }}
                    inputProps={{ maxLength: 50 }}
                    value={email}
                  />
                </div>

                <div
                  className='MetodoDePago'
                  style={{ display: "flex" }}
                >
                  <PaidIcon sx={{ color: 'action.active', marginRight: '5px' }} />
                  <FormControl fullWidth sx={{ marginRight: "4%", fontSize: "x-small" }} variant="filled">
                    <InputLabel color='quaternary'>
                      Método de Pago
                    </InputLabel>
                    <Select
                      color='quaternary'
                      sx={{
                        fontSize: "small",
                        mr: 3,
                        width: "105%"
                      }}
                      id="outlined-select-currency"
                      label="Método de Pago"
                      type="number"
                      fullWidth
                      onChange={handleMetodoPago}
                      value={metodoPago}
                      inputlabelprops={{
                        style: { fontSize: "small" },
                      }}
                    >
                      {/* <MenuItem value={"Credix"} sx={{ fontSize: "small" }}> Pago con Credix</MenuItem> */}
                      <MenuItem value={"Efectivo"} sx={{ fontSize: "small" }}>Efectivo</MenuItem>
                      <MenuItem value={"Sinpe Móvil"} sx={{ fontSize: "small" }}>Sinpe Móvil</MenuItem>
                      {/* <MenuItem value={"CardPayPal"} sx={{ fontSize: "small" }}>Cuenta PayPal</MenuItem> */}
                      <MenuItem value={"Tilopay"} sx={{ fontSize: "small" }}>Tilopay</MenuItem>
                      {/* <MenuItem value={"PayPal"} sx={{ fontSize: "small" }}>PayPal</MenuItem> */}
                    </Select>
                  </FormControl>
                </div>
                <div
                  className='MetodoDePago'
                  style={{ display: "flex" }}
                >
                  <LocalPhoneIcon sx={{ color: 'action.active', marginRight: '5px' }} />
                  <TextField
                    color='quaternary'
                    id="input-with-sx"
                    label="Número de teléfono"
                    variant="filled"
                    fullWidth
                    inputProps={{ maxLength: 12 }}
                    sx={{
                      height: "10%"
                    }}
                    inputlabelprops={{
                      style: { fontSize: "x-small" },
                    }}
                    onChange={(e) => handleNumber(e)}
                    value={numero}
                  />
                </div>
                <div
                  className='MetodoDePago'
                  style={{ display: "flex" }}
                >
                  <LocalShippingIcon sx={{ color: 'action.active', marginRight: '5px', marginTop: '5px' }} />
                  <FormControl fullWidth sx={{ marginRight: "5%" }} variant="filled">
                    <InputLabel color='quaternary'>
                      Método de Envío
                    </InputLabel>
                    <Select
                      color='quaternary'
                      fullWidth
                      sx={{
                        fontSize: "small",
                        mr: 3,
                        width: "106%"
                      }}
                      inputlabelprops={{
                        style: { fontSize: "small" },
                      }}
                      onChange={handleMetodoEnvio}
                      value={envio}
                      label="Metodo de Envio"
                    >
                      <MenuItem value={"Correos"} sx={{ fontSize: "small" }}> Correo de Costa Rica</MenuItem>
                      {/* <MenuItem value={"Presencial"} sx={{ fontSize: "small" }}> Presencial </MenuItem> */}
                      <MenuItem value={"Express"} sx={{ fontSize: "small" }}> Express</MenuItem>+
                    </Select>
                  </FormControl>
                </div>
              </Box>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "80%", height: "500px", marginTop: "8%" }}>
                <div className='title-direction'>
                  <h3>Dirección</h3>
                </div>
                <MapContainer center={position ? position : [0, 0]} zoom={13} scrollWheelZoom={false} ref={mapRef}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={markerPosition ? markerPosition : [0, 0]}
                    draggable
                    eventHandlers={{
                      dragend: handleMarkerDrag
                    }}
                  >
                  </Marker>
                </MapContainer>
                <div style={{ display: "flex", mr: 3, justifyContent: "space-between", marginTop: "2%", marginRight: "5%" }}>
                  <LocationOnIcon sx={{ marginTop: "5%" }} />
                  <TextField
                    fullWidth
                    color='quaternary'
                    label="Dirección para el envío"
                    variant="filled"
                    onChange={(e) => handleDireccion(e)}
                    sx={{ fontSize: "small", height: "5px", marginLeft: "5%" }}
                    inputlabelprops={{
                      style: { fontSize: "x-small" }
                    }}
                    inputProps={{ maxLength: 50 }}
                    value={direccion}
                  />
                </div>
              </Box>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ marginLeft: "10%", marginTop: '15px', textShadow: "0 0 #28B463", marginBottom: "15px" }}>
              Productos añadidos al pedido
            </h4>
          </div>
          <TableContainer
            className="TableContainer"
            sx={{
              marginLeft: "10%",
              width: "80%",
              border: "2px solid black",
              maxHeight: "415px", // Altura máxima del TableContainer
              maxWidth: "800px",
              overflow: "auto", // Habilitar scroll
            }}
          >
            <Table aria-label="simple table">
              <TableHead >
                <TableRow>
                  <TableCell sx={{ fontSize: "x-small", fontWeight: "bolder", border: "2px solid black" }}>Cantidad</TableCell>
                  <TableCell sx={{ fontSize: "x-small", fontWeight: "bolder", border: "2px solid black" }}>Nombre del Producto</TableCell>
                  <TableCell sx={{ fontSize: "x-small", fontWeight: "bolder", border: "2px solid black" }}>Precio Unitario </TableCell>
                  <TableCell sx={{ fontSize: "x-small", fontWeight: "bolder", border: "2px solid black" }}>Precio Total del Artículo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {
                  datosCompra.map((row) => {
                    return (
                      <TableRow key={row.id} sx={{ maxWidth: "30px" }} >
                        <TableCell sx={{ fontSize: "x-small", border: "2px solid black" }} >{row.quantity}</TableCell>
                        <TableCell sx={{ fontSize: "x-small", border: "2px solid black" }}>{row.name} </TableCell>
                        <TableCell sx={{ fontSize: "x-small", border: "2px solid black" }}>{row.price} ₡</TableCell>
                        <TableCell sx={{ fontSize: "x-small", border: "2px solid black" }}>{row.price * row.quantity}  ₡</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            className='ResponsiveBox'
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: "5%",
              marginBottom: "5%",
              alignSelf: "center"
            }}
          >
            <Typography sx={{ fontWeight: "bolder", marginLeft: "5%" }}>
              Total De Pago:
            </Typography>
            <Typography sx={{ fontWeight: "bolder", marginRight: "15%" }}>
              ₡  {calculateTotal()}
            </Typography>
          </Box>

          {metodoPago === 'Efectivo' && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "3%",
                marginBottom: "15px"
              }}>
              <Button
                onClick={SendMessage}
                disabled={!disable}
                sx={{
                  background: '#357A38',
                  border: "0.2em solid white",
                  marginRight: "10px",
                  marginBottom: '5px',
                  color: 'white',
                  '&:hover': {
                    background: '#00d084',
                  }
                }}
              >
                Confirmar
              </Button>
              <Typography sx={disable ? { color: "green", fontSize: 10 } : { color: "quaternary", fontSize: 9 }}>
                {disable ? "¡Datos Válidos para la compra!" : "Los Datos ingresados son inválidos"}
              </Typography>
            </Box>
          )}

          {/* Renderizar el botón adicional si el método de pago es "Tarjeta de Crédito" */}
          {/* {metodoPago === 'Tarjeta de Crédito' && (
            <Box
              className='ResponsiveBox'
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "5%",
                marginBottom: "5%",
                alignSelf: "center"
              }}
            >
              <button
                onClick={confirmPaymend}
                disabled={!disable}
                sx={{
                  background: '#357A38',
                  border: "0.2em solid white",
                  marginRight: "10px",
                  marginBottom: '5px',
                  color: 'white',
                  '&:hover': {
                    background: '#00d084',
                  }
                }}
              >
                Pagar con Tarjeta
              </button>

              <Typography sx={disable ? { color: "green", fontSize: 10 } : { color: "quaternary", fontSize: 9 }}>
                {disable ? "¡Datos Válidos para la compra!" : "Los Datos ingresados son inválidos"}
              </Typography>
            </Box>
          )} */}

          {/* Renderizar el botón adicional si el método de pago es "PayPal" */}
          {metodoPago === 'PayPal' && !camposCompletos && (
            <div>
              <Box
                className='ResponsiveBox'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginLeft: "3%",
                  marginRight: "3%",
                  marginTop: "5%",
                  marginBottom: "3%",
                  alignSelf: "center"
                }}
              >
                <Button
                  onClick={SendPaypalLink}
                  disabled={!disable}
                  sx={{
                    background: '#357A38',
                    border: "0.2em solid white",
                    marginRight: "10px",
                    marginBottom: '5px',
                    color: 'white',
                    '&:hover': {
                      background: '#00d084',
                    }
                  }}
                >
                  Pagar con PayPal link
                </Button>
              </Box>
              <div className="additional-content">
                <Typography sx={disable ? { color: "green", fontSize: 10 } : { color: "quaternary", fontSize: 9 }}>
                  {disable ? "¡Datos Válidos para la compra!" : "Los Datos ingresados son inválidos"}
                </Typography>
              </div>
            </div>
          )}

          {/* Renderizar el botón adicional si el método de pago es "Tilopay" */}
          {metodoPago === 'Tilopay' && !camposCompletos && (
            <div>
              <Box
                className='ResponsiveBox'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginLeft: "3%",
                  marginRight: "3%",
                  marginTop: "5%",
                  marginBottom: "3%",
                  alignSelf: "center"
                }}
              >
                <Button
                  onClick={SendTilopayLink}
                  disabled={!disable}
                  sx={{
                    background: '#357A38',
                    border: "0.2em solid white",
                    marginRight: "10px",
                    marginBottom: '5px',
                    color: 'white',
                    '&:hover': {
                      background: '#00d084',
                    }
                  }}
                >
                  Pagar con Tilopay link
                </Button>
              </Box>
              <div className="additional-content">
                <Typography sx={disable ? { color: "green", fontSize: 10 } : { color: "quaternary", fontSize: 9 }}>
                  {disable ? "¡Datos Válidos para la compra!" : "Los Datos ingresados son inválidos"}
                </Typography>
              </div>
            </div>
          )}

          {/* Renderizar el botón adicional si el método de pago es "PayPal" */}
          {/* {metodoPago === 'CardPayPal' && !camposCompletos && (
            <div>
              <Box
                className='ResponsiveBox'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginLeft: "3%",
                  marginRight: "3%",
                  marginTop: "5%",
                  marginBottom: "3%",
                  alignSelf: "center"
                }}
              >
                <PaymentPayPal datosCompra={datosCompra} dataInfoBuyer={dataInfoBuyer} />
              </Box>
              <div className="additional-content">
                <Typography sx={disable ? { color: "green", fontSize: 10 } : { color: "quaternary", fontSize: 9 }}>
                  {disable ? "¡Datos Válidos para la compra!" : "Los Datos ingresados son inválidos"}
                </Typography>
              </div>
            </div>
          )}  */}
        </Box>
      </Modal>
    </>
  )
}

export default BuyingModal