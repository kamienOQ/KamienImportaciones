import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Typography, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { onDeleteProduct } from "../../store/cart/cartSlice";

export const RemoveProductModal = ({ id }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveFromCart = () => {
    dispatch(onDeleteProduct(id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DeleteIcon color="error" sx={{ cursor: "pointer" }} onClick={handleOpenModal} />
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
              Eliminar producto
            </Typography>
          </Box>
          <Typography id="modal-description" sx={{ mt: 2, px: 2 }}>
            ¿Está seguro de que desea eliminar este producto del carrito?
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
              onClick={handleRemoveFromCart}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
