import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Cart } from "./Cart";
import { onSetProducts } from "../store/cart/cartSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const selectedProducts = [
    {
      id: 1,
      name: "Rolex",
      image: "https://media.es.wired.com/photos/63642bf096c8d8af89f54be9/16:9/w_2560%2Cc_limit/Rolex-Oyster-Perpetual-Deepsea-Challenge-Featured-Gear.jpg",
      attributes: ["Gris"],
      price: 60000,
      quantity: 1
    },
    {
      id: 2,
      name: "Irresistible",
      image: "https://media.vogue.mx/photos/6359591754ceeedb9e917da8/master/w_2200,h_2500,c_limit/Perfumes-Mujer-Irresistible-Givenchy.jpg",
      attributes: ["Mujer"],
      price: 15000,
      quantity: 1
    },
    {
      id: 3,
      name: "Cyxus",
      image: "https://m.media-amazon.com/images/I/61tqF3EZ7KL._AC_SL1500_.jpg",
      attributes: ["Negro", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul", "Luz Azul"],
      price: 20000,
      quantity: 1
    }
  ];

  useEffect(() => {
    dispatch(onSetProducts(selectedProducts));
  }, []);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container direction="row" justifyContent="space-around" alignItems="center" sx={{ justifyContent: { xs: "space-between", md: "space-around" } }}>
          <Typography variant="h6" noWrap component="h1">
            Kámien
          </Typography>
          <Cart />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};