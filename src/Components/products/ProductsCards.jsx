import { usePorductsStore } from "../../hooks/useProductsStore"

export const PorductsCards = ({urlImage, urlIcon, productName}) => {

  const { setProductSelected } = usePorductsStore();

  const onhandleSelectProduct = () => {
    console.log(productName)
    setProductSelected(productName)
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
