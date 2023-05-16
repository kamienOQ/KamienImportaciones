import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Modal, IconButton } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { onCleanProducts } from "../../store/cart/cartSlice";

export const CleanProductsModal = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCleanProducts = () => {
    dispatch(onCleanProducts());
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="close"
        onClick={handleOpenModal}
        disabled={ products.length > 0 ? false : true }
      >
        <RemoveShoppingCartIcon />
      </IconButton>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "white",
            color: "black",
            width: 400,
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              bgcolor: "#d32f2f", //D1B000
              px: 2,
              py: 1,
              borderRadius: "5px 5px 0 0",
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", color: "white" }}
            >
              Limpiar carrito
            </Typography>
          </Box>
          <Typography id="modal-description" sx={{ mt: 2, px: 2 }}>
            ¿Está seguro de que desea eliminar todos los productos del carrito?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              px: 2,
              pb: 2,
            }}
          >
            <Button sx={{ mr: 2 }} onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCleanProducts}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
