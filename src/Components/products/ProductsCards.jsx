import { Button, Grid, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { useProductsStore } from '../../hooks/useProductsStore'
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useUiStore } from '../../hooks';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery';

export const ProductsCards = ({ urlImage, urlIcon, urlPhoto, productName, relatedAttributes, price, relatedListAttributes, product }) => {
  const { openProductModal } = useUiStore();
  const { isSaving, setActiveProduct } = useProductsStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [urlImage, urlIcon, urlPhoto];

  const onOpenModal = () => {
    setActiveProduct(product);
    openProductModal();
  }

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const previousIndex = (currentImageIndex - 1) % images.length;
    setCurrentImageIndex(previousIndex);
  };

  return (
    <>
      <div className="main-container-productsCards-img">
        {images[currentImageIndex] ? (
          <figure className='container-figure-img-product'>
            <motion.img
              src={images[currentImageIndex]}
              alt=""
              id="product-image"
              className='productsCards-img'
              loading="lazy"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </figure>
        ) : (
          <Skeleton variant='rectangular' width="100%" height={215} />
        )}
        {urlIcon && urlPhoto && (
          <div className='buttonProductsCard'>
            <button onClick={handlePreviousImage}>
              <ArrowBackIosIcon />
            </button>
            <button onClick={handleNextImage}>
              <ArrowForwardIosIcon />
            </button>
          </div>
        )}
        <div className='container-productsCards'>
          <div className='container-productsCards-content'>
            <h1 className='productsCards-text'>
              {productName}
            </h1>
            <h1 className='productsCards-text'>
              {relatedListAttributes.join(', ')}
            </h1>
            <h2 className='productsCards-text'>Precio: ₡{price}</h2>
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

