import { ItemListContainer } from '../Components/products/itemListContainer/ItemListContainer'

export const ProductsPage = () => {
    const { products, startGetProducts } = useProductsStore();

  useEffect(() => {
    startGetProducts();
  }, [])

  return (
    <div>
        <ItemListContainer />
    </div>
  )
}

