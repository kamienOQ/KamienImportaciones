import { useProductsStore } from "../../hooks/useProductsStore"
import { ItemListContainer } from "./itemListContainer/ItemListContainer";

export const ProductsCards = ({urlImage, urlIcon, productName}) => {

  const { startGetProducts } = useProductsStore();

  const onhandleSelectProduct = () => {
    console.log(productName)
    startGetProducts(productName)
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
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

