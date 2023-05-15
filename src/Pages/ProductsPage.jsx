import { useEffect } from 'react';
import { useProductsStore } from '../hooks/useProductsStore';
import { ProductsEmpty } from '../Components/products/ProductsEmpty';
import { ProductsCards } from '../Components/products/ProductsCards';
import { useUiStore } from '../hooks/useUiStore';
import { ProductsModalDetail } from '../Components/products/ProductsModalDetail';
import { useCategoriesStore } from '../hooks/useCategoriesStore';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';

export const ProductsPage = () => {
  
  const { closeProductModal, isProductModalOpen } = useUiStore();

  const { products, startGetProducts, message, activeProduct } = useProductsStore();

  const { categorySelected, setCategorySelected } = useCategoriesStore();

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
        <Grid item sx={{ width: "90%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">{categorySelected}</Typography>
          <IconButton sx={{ mr: 1 }}>
            <Avatar src = {products.icon?.url}/>
          </IconButton>
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
          relatedListAttributes={Array.isArray(activeProduct.relatedListAttributes) ? activeProduct.relatedListAttributes.map(item => item.feature) : []}
          relatedAttributes={Array.isArray(activeProduct.relatedListAttributes) ? activeProduct.relatedListAttributes.map(item => item.attributeSelected) : []}
          urlImage={activeProduct.urlImage}
          urlIcon={activeProduct.urlIcon}
          productName={activeProduct.productName}
          product={activeProduct}
        />
      )}
    </>
  );  
}
