import { useProductsStore } from "../../hooks/useProductsStore"
import { Button, Grid, Typography } from "@mui/material";

export const ProductsCards = ({urlImage, urlIcon, productName, price, relatedAttributes, relatedListAttributes}) => {

  const { startGetProducts, isSaving } = useProductsStore();

  const onhandleSelectProduct = () => {
    console.log(productName)
    getProductsByCategory()
  }

  return (
    <div className='container-productsCards'>
      <a href="#" onClick={onhandleSelectProduct}>
        <figure className='container-figure-img'>
          <img src={urlImage} alt="" className='productsCards-img'/>
        </figure>
        <div className='main-container-productsCards-icon'>
          <div className='info-container-productsCards'>
            <div className='container-productsCards-icon'>
              <div className='container-productsCards-content'>
                <figure className='container-figure-icon'>
                  <img src={urlIcon} alt="" className='productsCards-icon' />
                </figure>
                <h2 className='productsCards-text'>{productName}</h2>
                <h2 className='productsCards-text'>Precio: ₡{price}</h2>
                {/* <h2 className='productsCards-text'>{relatedAttributes}</h2> */}
                {/* <h2 className='productsCards-text'>{relatedListAttributes}</h2> */}
              </div>
            </div>
          </div>
          <Grid item 
            sx={{ width: "90%", height: "90", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Button
              className="addProduct-modal-button"
              //onClick={onOpenModal}
              //startIcon={<AddCircleIcon />}
              sx={{ backgroundColor: 'success.main', minWidth: 0, color: "tertiary.main" }}
              variant='contained'
              disabled={isSaving}
            >
              Detalles del producto
            </Button>
          </Grid>
        </div>
      </a>
    </div>
  )
}

