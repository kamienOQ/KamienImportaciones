import { useUiStore } from "../../hooks";
import { useProductsStore } from "../../hooks/useProductsStore"
import { Button, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const ProductsCards = ({urlImage, urlIcon, productName, relatedAttributes, price, relatedListAttributes, product}) => {

  const { openProductModal } = useUiStore();

  const { isSaving, setActiveProduct } = useProductsStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onOpenModal = () => {
    setActiveProduct(product);
    openProductModal();
  }

  return (
    <>
      <div className="main-container-productsCards-img">
        <figure className='container-figure-img-product'>
            <img src={urlImage} alt="" className='productsCards-img'/>
        </figure>
        <div className='container-productsCards'>
            <div className='container-productsCards-content'> 
              <h1 className='productsCards-text'>
                {productName}
              </h1>  
              <h1 className='productsCards-text'></h1>
              <h2 className='productsCards-text'>
                Precio: ₡{price}
              </h2>
              <Grid item 
                sx={{ 
                  mt: isMobile ? 2 : 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <Button
                  className="addProduct-modal-button"
                  onClick={onOpenModal}
                  sx={{ backgroundColor: 'success.main', color: "tertiary.main" }}
                  variant='contained'
                  disabled={isSaving}
                >
                  Detalles del producto
                </Button>
              </Grid>
            </div>
        </div>
      </div>
    </>
  );
}

