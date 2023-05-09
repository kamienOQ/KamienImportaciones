import { ItemListContainer } from '../Components/products/itemListContainer/ItemListContainer'
import { useProductsStore } from '../hooks/useProductsStore';
import { ProductsEmpty } from "../Components/products/ProductsEmpty"
import { ProductsCards } from "../Components/products/ProductsCards"
import { useEffect } from 'react';

export const ProductsPage = () => {
    const { products, startGetProducts } = useProductsStore();

  useEffect(() => {
    startGetProducts();
  }, [])

  return (
    <div>
        <>
            {products.length > 0 ? (
            <div className="grid-container">
            {products.map((product) => (
                <ProductsCards
                  key={product.productName}
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
    </div>
  )
}
