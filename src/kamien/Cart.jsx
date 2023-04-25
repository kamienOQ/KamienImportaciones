import { useState } from "react";
import { Badge, Box, Button, Divider, Drawer, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EastIcon from '@mui/icons-material/East';

export const Cart = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Rolex",
      image: "https://media.es.wired.com/photos/63642bf096c8d8af89f54be9/16:9/w_2560%2Cc_limit/Rolex-Oyster-Perpetual-Deepsea-Challenge-Featured-Gear.jpg",
      attributes: ["Gris"],
      price: 60000
    },
    {
      id: 2,
      name: "Irresistible",
      image: "https://media.vogue.mx/photos/6359591754ceeedb9e917da8/master/w_2200,h_2500,c_limit/Perfumes-Mujer-Irresistible-Givenchy.jpg",
      attributes: ["Mujer"],
      price: 15000
    },
    {
      id: 3,
      name: "Cyxus",
      image: "https://m.media-amazon.com/images/I/61tqF3EZ7KL._AC_SL1500_.jpg",
      attributes: ["Negro", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul"],
      price: 20000
    },
    {
      id: 4,
      name: "Cyxus",
      image: "https://m.media-amazon.com/images/I/61tqF3EZ7KL._AC_SL1500_.jpg",
      attributes: ["Negro", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul"],
      price: 20000
    },
    {
      id: 5,
      name: "Cyxus",
      image: "https://m.media-amazon.com/images/I/61tqF3EZ7KL._AC_SL1500_.jpg",
      attributes: ["Negro", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul"],
      price: 20000
    },
    {
      id: 6,
      name: "Cyxus",
      image: "https://m.media-amazon.com/images/I/61tqF3EZ7KL._AC_SL1500_.jpg",
      attributes: ["Negro", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul"],
      price: 20000
    },
    {
      id: 7,
      name: "Cyxus",
      image: "https://m.media-amazon.com/images/I/61tqF3EZ7KL._AC_SL1500_.jpg",
      attributes: ["Negro", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul"],
      price: 20000
    },
    {
      id: 8,
      name: "Cyxus",
      image: "https://m.media-amazon.com/images/I/61tqF3EZ7KL._AC_SL1500_.jpg",
      attributes: ["Negro", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul"],
      price: 20000
    }
  ]);
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * quantity), 0);
    return total;
  }

  return (
    <div>
      <Button
        aria-controls="carrito-menu"
        aria-haspopup="true"
        onClick={handleDrawerOpen}
        color="inherit"
      >
        <Badge badgeContent={cartItems.length} color="secondary">
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
            <Typography variant="h6" noWrap component="h2">
              Pedido
            </Typography>
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
          {cartItems.map(item => (
            <Tooltip title="Dele click para más detalles" key={item.id}>
              <Grid container direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1, px: 1, pt: 0.5, cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}>
                <Grid item width="20%">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: 5 }}
                  />
                </Grid>
                <Grid item width="50%">
                  <Typography variant="subtitle1" noWrap component="h3" sx={{ mx: 1, fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle2" noWrap component="h4" sx={{ mx: 1, fontWeight: "normal" }}>
                    ₡{item.price} c/u
                  </Typography>
                  <Box display="flex" alignItems="center" sx={{ m: 1 }}>
                    <Button
                      size="medium"
                      onClick={handleDecrease}
                      sx={{ minWidth: "unset", width: "24px", height: "24px", p: 0, color: "white", backgroundColor: "#34BC89", "&:hover": { backgroundColor: "#34BC89" } }}
                    >
                      -
                    </Button>
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        maxWidth: "50px",
                        textAlign: "center",
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {quantity}
                    </Typography>
                    <Button
                      size="medium"
                      onClick={handleIncrease}
                      sx={{ minWidth: "unset", width: "24px", height: "24px", p: 0, color: "white", backgroundColor: "#34BC89", "&:hover": { backgroundColor: "#34BC89" } }}
                    >
                      +
                    </Button>
                  </Box>
                  {/* <List sx={{ display: "flex", flexWrap: "wrap", p: 0, mx: 1, "& span": {fontSize: "14px"}, maxWidth: "100%", overflow: "hidden" }}>
                    {item.attributes.map((attribute, index) => (
                      <ListItem key={index} disableGutters sx={{ p: 0, pr: 1, width: "auto", whiteSpace: "nowrap" }}>
                        <ListItemText variant="body2" primary={attribute} sx={{ color: "text.secondary" }} />
                      </ListItem>
                    ))}
                  </List> */}
                </Grid>
                <Grid item width="20%">
                  <Typography variant="body2" noWrap component="span">
                    ₡{item.price}
                  </Typography>
                </Grid>
                <Grid item width="10%" textAlign="end">
                  <DeleteIcon color="error" onClick={() => handleRemoveFromCart(item.id)}/>
                </Grid>
              </Grid>
            </Tooltip>
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
                onClick={() => console.log("Botón finalizar pedido clickeado")}
                sx={{ fontSize: "20px", borderRadius: "0", textTransform: "none" }}
              >
                Finalizar Pedido
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
};
