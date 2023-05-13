import { useUiStore } from "../../hooks";
import { useProductsStore } from "../../hooks/useProductsStore"
import { Button, Grid } from "@mui/material";

export const ProductsCards = ({urlImage, urlIcon, productName, price, relatedAttributes, relatedListAttributes}) => {

  const { openProductModal } = useUiStore();
  const { isSaving } = useProductsStore();

  const onOpenModal = () => {
    openProductModal();
  }

  return (
    <div>
      <div className="main-container-productsCards-img">
        <figure className='container-figure-img-product'>
            <img src={urlImage} alt="" className='productsCards-img'/>
        </figure>
        <div className='container-productsCards'>
          <div className='main-container-productsCards-icon'>
            <div className='container-productsCards-content'>
              <figure className='container-figure-icon'>
                <img src={urlIcon} alt="" className='productsCards-icon' />
              </figure>
              <h2 className='productsCards-text'>{productName}</h2>
              <h2 className='productsCards-text'>Precio: ₡{price}</h2>
              <h2 className='productsCards-text'>Lista de atributos: {relatedListAttributes}</h2>
            </div>
            <Grid item 
              sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
    </div>
  )
}

