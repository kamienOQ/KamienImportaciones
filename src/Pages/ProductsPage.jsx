import { useEffect, useState } from 'react';
import { useProductsStore } from '../hooks/useProductsStore';
import { ProductsEmpty } from '../Components/products/ProductsEmpty';
import { ProductsCards } from '../Components/products/ProductsCards';
import { useUiStore } from '../hooks/useUiStore';
import { ProductsModalDetail } from '../Components/products/ProductsModalDetail';
import { useCategoriesStore } from '../hooks/useCategoriesStore';
import { Divider, Drawer, Grid, IconButton, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { GenderFilter, AttributeFilter } from '../filters'
import { useAttributesStore } from "../hooks";

export const ProductsPage = () => {
  
  const [ isOpen, setIsOpen ] = useState(false);

  const { startGetAttributesByCategory, attributes } = useAttributesStore();

  const { closeProductModal, isProductModalOpen } = useUiStore();

  const { products, startGetProducts, message, activeProduct } = useProductsStore();

  const { categorySelected, setCategorySelected } = useCategoriesStore();
  
  function handleOpen() {
    startGetAttributesByCategory();
    setIsOpen(true);
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
  }, [categorySelected]);

  return (
    <>
      <Grid container className="secundary-products-container" spacing={2} sx={{ padding: 2, mt: 6, borderRadius: 1.2, display: 'flex', direction: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item sx={{ width: "90%", display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleOpen}>
            <FilterAltIcon 
              fontSize="large"
            />
          </IconButton>
          <div>
            <Drawer anchor="left" open={isOpen} onClose={handleClose}>
                <div style={{ width: 300 }}>
                <GenderFilter />
                <Divider />
                <AttributeFilter attributesList = {attributes} />
                </div>
            </Drawer>
          </div>
          <Typography variant="h4">{categorySelected}</Typography>
          {/* <figure className='container-figure-img-product'>
                <img src={products.icon?.url} alt=""/>
          </figure> */}
        </Grid>
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
    </>
  );  
}
