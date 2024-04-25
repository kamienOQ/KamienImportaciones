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

const BuyingModal = ({ open, setOpen, datosCompra }) => {
  const { whatsapp } = useAboutStore();

  const [unitaryPricetotal, setunitaryPriceTotal] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [name, setname] = useState("");
  const [numero, setNumero] = useState("");
  const [envio, setenvio] = useState("");
  const [mensajeEnvio, setMensajeEnvio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [disable, setdisable] = useState(false);
  const [position, setPosition] = useState(undefined);
  const [markerPosition, setMarkerPosition] = useState(undefined);
  const mapRef = useRef(null);

  const dispatch = useDispatch();

  const SendMessage = async () => {
    let fecha = new Date();
    const data = {
      address: direccion,
      cellphone: numero,
      date: fecha.getTime(),
      name: name,
      nameLowerCase: name.toLowerCase(),
      status: "Pendiente",
      wayToPay: metodoPago,
      sendMethod: envio,
      products: datosCompra,
      totalPrice: calculateTotal()
    }

    // Obtener el número de teléfono de la URL de WhatsApp
    const phoneNumber = whatsapp.match(/\+\d+/)[0];
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensajeEnvio + `https://www.google.com/maps?q=${markerPosition[0]},${markerPosition[1]}`)}&phone=${phoneNumber}`
    window.open(url);
    setNumero("")
    setname("")
    setDireccion("")
    setenvio("")
    setMetodoPago("")
    setdisable(false)
    setOpen(!open)
    await crearPedido(data);
    dispatch(onChangeSuccess(true));
    dispatch(onCleanProducts());
  };



  const checkNull = () => {
    if (numero.length < 7 || envio === "" || metodoPago === "" || name.length < 4) {
      setdisable(false)
    } else {
      setdisable(true)
    }
  }

  const calculateTotal = () => {
    const total = datosCompra.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return total;
  }

  const manageMsg = () => {
    setMensajeEnvio(
      "Compra Kámien" +
      "\n Nombre: " + name +
      "\n Método de pago: " + metodoPago +
      "\n Método de envío: " + envio +
      "\n Número de teléfono: " + numero +
      "\n Precio Total de la compra: " + calculateTotal() +
      "\n Dirección: " + direccion +
      "\n Total de Artículos: \n" +
      datosCompra.map((row) => {
        let fila = "x" + row.quantity + "   " + row.name + " " + Object.keys(row.relatedListAttributes).map((key) => {
          return " " + row.relatedListAttributes[key]
        }
        )
          + "                " + row.price * row.quantity + "\n"
        return fila
      })
      + "\n Ubicación: "
    )
  }

  const handleMetodoPago = (event) => {
    setMetodoPago(event.target.value)
    manageMsg()
    checkNull()
  }

  const handleMetodoEnvio = (event) => {
    setenvio(event.target.value)
    manageMsg()
    checkNull()
  }

  const handleDireccion = (event) => {
    setDireccion(event.target.value)
    manageMsg()
    checkNull()
  }

  const handleName = (event) => {
    setname(event.target.value)
    manageMsg()
    checkNull()
  }

  const handleNumber = (event) => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(event.target.value)) {
      setNumero(event.target.value)
      manageMsg()
      checkNull()
    }
  }

  const handleClose = () => {
    setOpen(!open)
  }

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
        }}>
          <GppBadIcon sx={{ marginRight: "5%" }} />
          <Typography sx={{ fontWeight: "bolder" }}>
            <FaRegFaceSadCry color="blue" /> No Hay Productos en el carrito
          </Typography>
        </Box>
      </Modal>
    )
  }

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
              width: "330px"
            },
            '@media (min-width: 280px) and (min-height: 500px)': {
              width: "260px",
              height: "570px !important",
              overflowY: "auto"
            },
            '@media (min-width: 360px) and (min-height: 700px)': {
              width: "345px",
              height: "660px !important",
              overflowY: "auto"
            },
            '@media (min-width: 375px) and (min-height: 600px)': {
              width: "350px",
              height: "620px !important",
              overflowY: "auto"
            },
            '@media (min-width: 412px) and (min-height: 800px)': {
              width: "385px",
              height: "800px !important",
              overflowY: "auto"
            },
            '@media (min-width: 414px)': {
              width: "330px"
            },
            '@media (min-width: 540px)': {
              width: "480px"
            },
            '@media (min-width: 768px)': {
              width: "600px"
            },
            '@media (min-width: 800px) and (min-height: 1000px)': {
              width: "730px",
              height: "1100px !important",
              overflowY: "auto"
            },
            '@media (min-width: 912px) and (min-height: 600px)': {
              width: "600px",
              height: "1250px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1024px) and (min-height: 600px)': {
              width: "550px",
              height: "550px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1024px) and (min-height: 800px)': {
              width: "960px",
              height: "740px !important",
              overflowY: "auto"
            },
            '@media (min-width: 1300px) and (min-height: 900px)': {
              width: "620px",
              height: "950px !important",
              overflowY: "auto"
            }
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
                    variant="standard"
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
                  style={{ display: "flex" }}
                >
                  <PaidIcon sx={{ color: 'action.active', marginRight: '5px' }} />
                  <FormControl fullWidth sx={{ marginRight: "4%", fontSize: "x-small" }}>
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
                      fullWidth
                      onChange={handleMetodoPago}
                      value={metodoPago}
                      inputlabelprops={{
                        style: { fontSize: "small" },
                      }}
                    >
                      <MenuItem value={"Efectivo"} sx={{ fontSize: "small" }}>Efectivo</MenuItem>
                      <MenuItem value={"Sinpe Móvil"} sx={{ fontSize: "small" }}>Sinpe Móvil</MenuItem>
                      <MenuItem value={"Tarjeta de Crédito"} sx={{ fontSize: "small" }}>Tarjeta de Crédito</MenuItem>
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
                    variant="standard"
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
                  <FormControl fullWidth sx={{ marginRight: "5%" }}>
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
                      <MenuItem value={"Correo"} sx={{ fontSize: "small" }}> Correo </MenuItem>
                      <MenuItem value={"Presencial"} sx={{ fontSize: "small" }}> Presencial </MenuItem>
                      <MenuItem value={"Express"} sx={{ fontSize: "small" }}> Express </MenuItem>
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
                    variant="standard"
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
                  <TableCell sx={{ fontSize: "x-small", fontWeight: "bolder", border: "2px solid black" }} >Nombre del Producto</TableCell>
                  <TableCell sx={{ fontSize: "x-small", fontWeight: "bolder", border: "2px solid black" }}>Precio Unitario </TableCell>
                  <TableCell sx={{ fontSize: "x-small", fontWeight: "bolder", border: "2px solid black" }}>Precio Total del Artículo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {
                  datosCompra.map((row) => {
                    return (
                      <TableRow key={row.id} sx={{ maxWidth: "30px" }} >
                        <TableCell sx={{ fontSize: "x-small", border: "2px solid black" }} >{row.name}</TableCell>
                        <TableCell sx={{ fontSize: "x-small", border: "2px solid black" }}>{row.quantity} </TableCell>
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
        </Box>
      </Modal>
    </>
  )
}

export default BuyingModal