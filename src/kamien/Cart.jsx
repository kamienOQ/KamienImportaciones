import { useState } from "react";
import { useSelector } from "react-redux";
import { Badge, Box, Button, Divider, Drawer, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EastIcon from '@mui/icons-material/East';
import { CartItem } from "./CartItem";
import { CleanProductsModal } from "./CleanProductsModal";
import BuyingModal from "../Components/confirm/BuyingModal";
export const Cart = () => {
  
  const { products } = useSelector((state) => state.cart);

  const [openDrawer, setOpenDrawer] = useState(false);
  // const [cartItems, setCartItems] = useState(products);
  /* const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  }; */
  const [open, setopen] = useState(false)
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleModalClose = () =>{
    setopen(!open)
  }
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const calculateTotal = () => {
    const total = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return total;
  }

  return (
    <>
      <Button
        aria-controls="carrito-menu"
        aria-haspopup="true"
        onClick={handleDrawerOpen}
        color="inherit"
      >
        <Badge badgeContent={products.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </Button>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
        variant="temporary"
      >
        <Grid container sx={{ width: "360px" }}>
          <Grid container display="flex" direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, backgroundColor: "white", borderBottom: "1px solid #d0d0d0" }}>
            <Typography variant="h6" noWrap component="h2" sx={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartIcon /> Pedido
            </Typography>
            <CleanProductsModal />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="close"
              onClick={handleDrawerClose}
              sx={{ border: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Box className="scrollable-container" sx={{ maxHeight: "570px", overflow: "auto" }}>
            {products.map((item) => (
              <CartItem key={item.id} {...item}/>
            ))}
          </Box>
          <Grid item xs={12} sx={{ position: "fixed", bottom: 0, right: 0, backgroundColor: "white" }}>
            <Divider sx={{ backgroundColor: "#d0d0d0" }} />
            <Box sx={{ pt: 1, width: "360px" }}>
              <Typography variant="body1" component="p" sx={{ textAlign: "center", fontSize: "18px" }}>
                Total: ₡{calculateTotal()}
              </Typography>
            </Box>
            <Box sx={{ pt: 1, width: "360px" }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<EastIcon />}
                sx={{ fontSize: "20px", borderRadius: "0", textTransform: "none" }}
                onClick={handleModalClose}
              >
                Finalizar Pedido
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Drawer>
      <BuyingModal open = {open} setOpen = {setopen} datosCompra = {products}/>
    </>
  );
};
