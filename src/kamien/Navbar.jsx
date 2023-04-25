import React from "react";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Cart } from "./Cart";

export const Navbar = () => {
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