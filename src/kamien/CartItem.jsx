import { useDispatch } from "react-redux";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  onDecreaseQuantity,
  onIncreaseQuantity,
} from "../store/cart/cartSlice";
import { RemoveProductModal } from "./RemoveProductModal";

export const CartItem = ({ id, name, image, price, quantity }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(onDecreaseQuantity(id));
    }
  };

  const handleIncrease = () => {
    dispatch(onIncreaseQuantity(id));
  };

  return (
    <>
      {/* <Tooltip title="Dele click para más detalles"> */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: 1,
          px: 1,
          pt: 0.5,
          //cursor: "pointer",
          "&:hover": { backgroundColor: "#f5f5f5" },
        }}
      >
        <Grid item width="20%">
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 5,
            }}
          />
        </Grid>
        <Grid item width="50%">
          <Typography
            variant="subtitle1"
            noWrap
            component="h3"
            sx={{ mx: 1, fontWeight: "bold" }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            noWrap
            component="h4"
            sx={{ mx: 1, fontWeight: "normal" }}
          >
            ₡{price} c/u
          </Typography>
          <Box display="flex" alignItems="center" sx={{ m: 1 }}>
            <Button
              size="medium"
              onClick={handleDecrease}
              sx={{
                minWidth: "unset",
                width: "24px",
                height: "24px",
                p: 0,
                color: "white",
                backgroundColor: "#34BC89",
                "&:hover": { backgroundColor: "#34BC89" },
              }}
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
                whiteSpace: "nowrap",
              }}
            >
              {quantity}
            </Typography>
            <Button
              size="medium"
              onClick={handleIncrease}
              sx={{
                minWidth: "unset",
                width: "24px",
                height: "24px",
                p: 0,
                color: "white",
                backgroundColor: "#34BC89",
                "&:hover": { backgroundColor: "#34BC89" },
              }}
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
            ₡{price * quantity}
          </Typography>
        </Grid>
        <Grid item width="10%" textAlign="end">
          <RemoveProductModal id={id} />
        </Grid>
      </Grid>
      {/* </Tooltip> */}
    </>
  );
};
