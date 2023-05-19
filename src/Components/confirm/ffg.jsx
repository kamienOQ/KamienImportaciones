import { useState,useEffect,useRef } from 'react'
import { Modal,Box,Button, Table,TextField,TableContainer,MenuItem,TableHead,TableCell,TableRow,TableBody, Typography,InputLabel, Select, FormControl, drawerClasses } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';  
import PaidIcon from '@mui/icons-material/Paid';
import ClearIcon from '@mui/icons-material/Clear';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GppBadIcon from '@mui/icons-material/GppBad';
import { crearPedido } from '../../firebase/providers';
import { MapContainer,Marker,TileLayer } from "react-leaflet"
import "./BuyingModal.css"

const BuyingModal = ({open,setOpen,datosCompra}) => {
  const [unitaryPricetotal,setunitaryPriceTotal] = useState(0)
  const [metodoPago,setMetodoPago] = useState("")
  const [name,setname] = useState("")
  const [numero, setNumero] = useState("")
  const [envio, setenvio] = useState("")
  const [mensajeEnvio ,setMensajeEnvio] = useState("")
  const [direccion, setDireccion] = useState("")
  const [disable, setdisable] = useState(false)
  const [position,setPosition] = useState(undefined)
  const [markerPosition, setMarkerPosition] = useState(undefined)
  const mapRef = useRef(null)
  const [numeroAdmin,setNumeroAdmin] = useState("62805962")

  const SendMessage = async() => {
    let fecha = new Date();
    const data = {
      address : direccion,
      cellphone : numero,
      date : fecha.getTime(),
      name : name,
      nameLowerCase: name.toLowerCase(),
      status : "Pendiente",
      wayToPay : metodoPago,
      sendMethod : envio,
      products : datosCompra,
      totalPrice : calculateTotal()
    }
    await crearPedido(data);
    const url = https://api.whatsapp.com/send?text=${encodeURIComponent(mensajeEnvio + `https://www.google.com/maps?q=${markerPosition[0]},${markerPosition[1]})}&phone=${numeroAdmin}`
    window.open(url);
    setNumero("")
    setname("")
    setDireccion("")
    setenvio("")
    setMetodoPago("")
    setdisable(false)
    setOpen(!open)
  }

  const checkNull = () =>
  {
    if (numero.length < 7  envio === ""  metodoPago === "" || name.length < 4  ){
      setdisable(false)
    }else{
    setdisable(true)
    }
  }

  const calculateTotal = () => {
    const total = datosCompra.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return total;
  }

  const manageMsg = () =>{
    setMensajeEnvio(
      "Compra Kámien"                  +
      "\n Nombre: "                    + name + 
      "\n Método de pago: "            + metodoPago +
      "\n Método de envío: "           + envio +
      "\n Número de teléfono: "        + numero +
      "\n Precio Total de la compra: " + calculateTotal() +
      "\n Dirección: "                 + direccion +
      "\n Total de Artículos: \n" +
      datosCompra.map((row) => {
        let fila = "x" + row.quantity+ "   " + row.name + " " + Object.keys(row.relatedListAttributes).map((key) =>
        {
            return " " + row.relatedListAttributes[key]
        }
        )
          + "                " + row.price * row.quantity +  "\n" 
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

  const handleDireccion = (event) =>{
    setDireccion(event.target.value)
    manageMsg()
    checkNull()
  } 

  const handleName = (event) =>{
    setname(event.target.value)
    manageMsg()
    checkNull()
  }

  const handleNumber = (event) => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(event.target.value)){
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
        const getunitaryPriceTotal = () =>{
        let price_array = datosCompra.map((row) =>{
            let unitaryPrice_total = 0
            unitaryPrice_total = (unitaryPrice_total + row.unitaryPrice) * row.quantity 
            return unitaryPrice_total
        })
        setunitaryPriceTotal(price_array.reduce(add,0))
        }
        getunitaryPriceTotal()
    }, [])

    const handleMarkerDrag = (e) => { 
        setMarkerPosition([e.target._latlng.lat,e.target._latlng.lng])
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition([position.coords.latitude,position.coords.longitude])
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
        return(
            <Modal open = {open} onClose={handleClose} sx = {{ display:"flex",justifyContent:"center",alignItems:"center" }}>
                <Box sx = {{
                width:"25%",
                height:"25%",
                background:"white",
                border: "2px solid gray",
                borderRadius:"20px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
                }}>
                    <GppBadIcon sx = {{marginRight:"5%"}}/>
                    <Typography sx = {{fontWeight:"bolder"}}>
                        No Hay Productos en el carrito
                    </Typography>
                </Box>
            </Modal>
        )
    }

  return (
    <>
      <Modal 
        className = "modal" 
        open = {open} 
        onClose={handleClose}
      >
        <Box 
          sx = {{
          background:"#FFFFFF",
          color:"black",
          borderRadius:"20px"
          }}
        >
            <div style={{ display : "flex", justifyContent: "space-between", marginTop: "10px"}}>
              <h3 style={{marginLeft: "5%"}}>
                Confirmar Pedido
              </h3>
              <Button 
              sx={{color: "white",  
                background:"gray",
                marginRight: "5%",
                minWidth:"30px",
                height:"30px",
                marginTop:"1%"
                }}
              onClick={handleClose}
              >
                <ClearIcon/>
              </Button>
            </div>
            <div>
            <div style={{display:"flex",justifyContent:"space-between" }}>
              <Box sx = {{minWidth: "50%", maxWidth:"50%",maxHeight:"50%" ,marginLeft:"2%"}}>
                <MapContainer center={position ? position : [0,0]} zoom={13} scrollWheelZoom={false} ref = {mapRef}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker 
                    position={markerPosition ? markerPosition : [0,0]}
                    draggable
                    eventHandlers={{
                        dragend : handleMarkerDrag
                    }}
                  >
                  </Marker>
                </MapContainer>
                <div  style={{display: "flex",mr: 3,justifyContent:"space-between",marginTop:"2%",marginRight:"5%"}}>
                  <LocationOnIcon sx = {{marginTop:"5%"}}/>
                  <TextField 
                    fullWidth
                    color='quaternary'
                    label="Dirección para el envío" 
                    variant="standard" 
                    onChange={(e) => handleDireccion(e)}
                    sx = {{ fontSize:"small", height:"5px", marginLeft:"5%"}}
                    inputlabelprops={{
                      style: { fontSize: "x-small" }
                    }}
                    inputProps={{ maxLength: 50 }}
                    value = {direccion}
                  />
                </div>
              </Box>  
              <Box sx={{ display: 'grid', alignItems: 'flex-end' ,width:"45%"}}>
              <div
                className='MetodoDePago'
                style={{display:"flex",justifyContent:"space-between"}}
              >
                <AccountCircle sx={{ color: 'action.active', marginRight: '5px' }} />
                <TextField 
                  color= 'quaternary'
                  id="input-with-sx" 
                  label="Nombre" 
                  variant="standard" 
                  onChange={(e) => handleName(e)}
                  fullWidth
                  sx = {{ fontSize:"small", marginBottom: '5px', marginRight: '10px' }}
                  inputlabelprops={{
                    style: { fontSize: "x-small" }
                  }}
                  inputProps={{maxLength:50}}
                  value={name}
                />
                </div>
                <div 
                  className='MetodoDePago'
                  style={{ display:"flex", marginTop:'5px' }}
                >
                  <PaidIcon sx={{ color: 'action.active', marginRight: '5px' }} />
                  <FormControl fullWidth sx = {{ marginRight:"4%", fontSize: "x-small"}}>
                    <InputLabel color= 'quaternary'>
                      Método de Pago
                    </InputLabel>
                    <Select
                      color= 'quaternary'
                      sx = {{marginRight:"5%",fontSize:"small",mr: 3}}
                      id="outlined-select-currency"
                      label="Método de Pago"
                      fullWidth
                      onChange={handleMetodoPago}
                      value={metodoPago}
                      inputlabelprops={{
                        style: { fontSize: "x-small" },
                      }}
                    >
                        <MenuItem value = {"Efectivo"} sx = {{fontSize:"x-small"}}>Efectivo</MenuItem>
                        <MenuItem value = {"Sinpe Móvil"} sx = {{fontSize:"x-small"}}>Sinpe Móvil</MenuItem>
                        <MenuItem value = {"Tarjeta de Crédito"} sx = {{fontSize:"x-small"}}>Tarjeta de Crédito</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div 
                  className='MetodoDePago'
                  style={{ display:"flex" }}
                >
                <LocalPhoneIcon sx={{ color: 'action.active', marginRight: '5px' }}  />
                <TextField 
                  color= 'quaternary'
                  id="input-with-sx" 
                  label="Número de teléfono" 
                  variant="standard"  
                  fullWidth 
                  inputProps={{ maxLength:12 }}
                  sx = {{ marginRight:"5%", height:"10%" }} 
                  inputlabelprops={{
                    style: { fontSize: "x-small" },
                  }}
                  onChange={(e) => handleNumber(e)}
                  value={numero}
                  />
                </div>
                <div 
                  className='MetodoDePago'
                  style={{ display:"flex", marginTop:'10px' }}
                >
                  <LocalShippingIcon sx={{ color: 'action.active', marginRight: '5px', marginTop: '5px' }} />
                  <FormControl fullWidth sx = {{marginRight:"5%"}}>
                    <InputLabel color= 'quaternary'>
                      Método de Envío
                    </InputLabel>
                    <Select
                      color= 'quaternary'
                      fullWidth
                      sx = {{
                        marginRight:"5%"
                      }}
                      inputlabelprops={{
                        style: { fontSize: "small" },
                      }}
                      onChange={handleMetodoEnvio}
                      value = {envio}
                      label = "Metodo de Envio"
                    >
                        <MenuItem value = {"Correo"} sx = {{fontSize:"x-small"}}> Correo </MenuItem>
                        <MenuItem value = {"Presencial"} sx = {{fontSize:"x-small"}}> Presencial </MenuItem>
                        <MenuItem value = {"Express"} sx = {{fontSize:"x-small"}}> Express </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Box>
            </div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <h5 style={{ marginLeft:"10%", marginTop: '15px' }}>
                Productos añadidos al pedido
              </h5>
            
              <Box 
                sx = {{ marginRight:"5%", marginBottom:"2%", marginTop: "15px" }}
              >
                <Typography sx = { disable ? { color:"green", fontSize: 10 } : { color:"quaternary", fontSize: 9 } }>
                  {disable ? "¡Datos Válidos para la compra!":"Los Datos ingresados son inválidos"}
                </Typography>
                <Button 
                  onClick = {SendMessage} 
                  disabled = {!disable} 
                  sx={{ 
                    background: '#357A38', 
                    marginRight: '5%', 
                    color: 'white', '&:hover': { background: '#3aac54' 
                  }}}
                >
                  Confirmar
                </Button>
              </Box>
            </div>
            <TableContainer
              className='TableContainer' 
              sx = {{ maxHeight: "250px", overflow: "auto", width:"85%", marginLeft: "10%" }}
            >
              <Table aria-label="simple table">
                <TableHead >
                  <TableRow>
                    <TableCell sx = {{ fontSize:"small", fontWeight:"bolder" }}>Cantidad</TableCell>
                    <TableCell sx = {{ fontSize:"small", fontWeight:"bolder" }} >Nombre del Producto</TableCell>
                    <TableCell sx = {{ fontSize:"small", fontWeight:"bolder" }}>Precio Unitario </TableCell>
                    <TableCell sx = {{ fontSize:"small", fontWeight:"bolder" }}>Precio Total del Artículo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {
                    datosCompra.map((row) => {
                      return(
                      <TableRow key={row.id} sx = {{maxWidth:"30px"}} >
                        <TableCell sx = {{fontSize:"small"}} >{row.name}</TableCell>
                        <TableCell sx = {{fontSize:"small"}}>{row.quantity} </TableCell>
                        <TableCell sx = {{fontSize:"small"}}>{row.price} ₡</TableCell>
                        <TableCell sx = {{fontSize:"small"}}>{row.price * row.quantity}  ₡</TableCell>
                      </TableRow>
                      )
                    }) 
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <Box 
              className='ResponsiveBox'
              sx ={{
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between",
                marginLeft:"5%",
                marginRight:"5%",
                marginTop: "5%",
                marginBottom: "5%",
                alignSelf:"center"}}
            >  
              <Typography sx = {{ fontWeight: "bolder", marginLeft: "5%" }}>
                  Total De Pago: 
              </Typography>
              <Typography sx = {{ fontWeight: "bolder", marginRight: "15%" }}>
              ₡  {calculateTotal()}
              </Typography>
            </Box>
          </Box>
      </Modal>
    </>
  )
}

export default BuyingModal