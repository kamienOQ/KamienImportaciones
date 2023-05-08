import { ItemListContainer } from '../Components/products/itemListContainer/ItemListContainer'
import { useProductsStore } from '../hooks/useProductsStore';

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
                <ItemListContainer
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

