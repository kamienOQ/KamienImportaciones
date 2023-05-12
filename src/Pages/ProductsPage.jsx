import { useProductsStore } from '../hooks/useProductsStore';
import { ProductsEmpty } from "../Components/products/ProductsEmpty"
import { ProductsCards } from "../Components/products/ProductsCards"
import { useEffect } from 'react';
import { Button, Grid, Typography } from "@mui/material";
import { useUiStore } from '../hooks/useUiStore';
import { ProductsDetail } from '../Components/products/ProductsDetail';
import { useCategoriesStore } from '../hooks/useCategoriesStore';
import { ProductView } from '../Components/products/ProductView';

export const ProductsPage = ({productName}) => {
  
  const { openProductModal, closeProductModal, isProductModalOpen } = useUiStore();
  const { products, startGetProducts, message, isSaving } = useProductsStore();

  const { categorySelected } = useCategoriesStore();

  useEffect(() => {
    if (!!message.success) {
      closeProductModal();
    }
  }, [message.success]);
  
  useEffect(() => {
    console.log(categorySelected)
    startGetProducts(categorySelected);
  }, [])

  return (
    <div>
        <>
            {products.length > 0 ? (
            <div className="grid-container-product">
              {products.map((product) => (
                  <ProductsCards
                    key={product.productName}
                    price={product.price}
                    relatedAttributes={product.relatedAttributes + ""}
                    urlImage={product.image?.url}
                    urlIcon={product.icon?.url}
                    productName={product.productName}
                  />
              ))}
            </div>)
            : (
            <ProductsEmpty />
            )}
        </>
        {isProductModalOpen && 
          <ProductsDetail />
        }
        <ProductView />
    </div>
  )
}
