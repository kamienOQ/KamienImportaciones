import { useEffect } from 'react';
import { useProductsStore } from '../hooks/useProductsStore';
import { ProductsEmpty } from '../Components/products/ProductsEmpty';
import { ProductsCards } from '../Components/products/ProductsCards';
import { useUiStore } from '../hooks/useUiStore';
import { ProductsModalDetail } from '../Components/products/ProductsModalDetail';
import { useCategoriesStore } from '../hooks/useCategoriesStore';

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
    console.log(categorySelected)
    setCategorySelected(localStorage.getItem('categorySelected'));
    startGetProducts(categorySelected);
  }, [categorySelected])

  return (
      <>
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
        </div>)
        : (
        <ProductsEmpty />
        )}
        {isProductModalOpen && products.map((product) => (
          <ProductsModalDetail 
            key={activeProduct.productName}
            price={activeProduct.price}
            relatedListAttributes={Array.isArray(activeProduct.relatedListAttributes) ? activeProduct.relatedListAttributes.map(item => item.feature) : []}
            relatedAttributes={product.relatedAttributes}
            urlImage={activeProduct.urlImage}
            urlIcon={activeProduct.urlIcon}
            productName={activeProduct.productName}
            product={activeProduct}
          />
        ))}
      </>
  )
}
