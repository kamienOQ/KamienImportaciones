import { useEffect, useState } from 'react';
import { useProductsStore } from '../hooks/useProductsStore';
import { ProductsEmpty } from '../Components/products/ProductsEmpty';
import { ProductsCards } from '../Components/products/ProductsCards';
import { useUiStore } from '../hooks/useUiStore';
import { ProductsModalDetail } from '../Components/products/ProductsModalDetail';
import { useCategoriesStore } from '../hooks/useCategoriesStore';
import { Divider, Drawer, Grid, IconButton, Typography, Tooltip,Box,} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { GenderFilter, AttributeFilter } from '../filters'
import { useAttributesStore } from "../hooks";

export const ProductsPage = () => {
  const { startGetAttributesByCategory, setIsOpen, isOpen} = useAttributesStore();

  const { closeProductModal, isProductModalOpen } = useUiStore();

  const { products, startGetProducts, message, activeProduct } = useProductsStore();

  const { categorySelected, setCategorySelected } = useCategoriesStore();

  const drawerWidth = 300;
  

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
      setIsOpen(false);
  }

  useEffect(() => {
    if (!!message.success) {
      closeProductModal();
    }
  }, [message.success]);
  
  useEffect(() => {
    setCategorySelected(localStorage.getItem('categorySelected'));
    startGetProducts(categorySelected);
    startGetAttributesByCategory();
  }, [categorySelected]);




  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Drawer anchor="left" open={isOpen} onClose={handleClose} variant='persistent'>
          <div style={{ width: 300 }}>
            <IconButton onClick={handleClose}>
              <ChevronLeftIcon />
            </IconButton>      
            <GenderFilter />
            <Divider />
            <AttributeFilter/>
          </div>
        </Drawer>
      </div>
      <Grid container className={`secundary-products-container ${isOpen ? 'open' : ''}`} spacing={2} sx={{ padding: 2, mt: 6, borderRadius: 1.2, display: 'flex', direction: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item sx={{ width: "90%", display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Filtros">
            <IconButton onClick={handleOpen}>
              <FilterListIcon fontSize="large"/>
            </IconButton>
          </Tooltip>
          <Typography variant="h4">{categorySelected}</Typography>
          {/* <figure className='container-figure-img-product'>
                <img src={products.icon?.url} alt=""/>
          </figure> */}
        </Grid>
      
      
      {products.length > 0 ? (
          <div className="grid-container-product">
            {products.map((product) => (
              <ProductsCards
                key={product.productName}
                price={product.price}
                relatedListAttributes={Array.isArray(product.relatedListAttributes) ? product.relatedListAttributes.map(item => item.feature) : []}
                urlImage={product.image?.url}
                urlIcon={product.icon?.url}
                productName={product.productName}
                product={product}
              />
            ))}
          </div>
        ) : (
          <ProductsEmpty />
        )}
        {isProductModalOpen && (
          <ProductsModalDetail
            key={activeProduct.productName}
            price={activeProduct.price}
            relatedListAttributes={activeProduct.relatedListAttributes}
            relatedAttributes={Array.from(new Set(activeProduct.relatedListAttributes.map(item => item.attributeSelected)))}
            urlImage={activeProduct.urlImage}
            urlIcon={activeProduct.urlIcon}
            productName={activeProduct.productName}
            product={activeProduct}
          />
        )}
      </Grid>
    </Box>
  );  
}