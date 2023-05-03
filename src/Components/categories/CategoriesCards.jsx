import { useCategoriesStore } from "../../hooks/useCategoriesStore"

export const CategoriesCards = ({urlImage, urlIcon, categoryName}) => {

  const { setCategorySelected } = useCategoriesStore();

  const onhandleSelectCategory = () => {
    console.log(categoryName)
    setCategorySelected(categoryName)
  }

  return (
    <div className='container-categoriesCards'>
      <a href="#" onClick={onhandleSelectCategory}>
        <figure className='container-figure-img'>
          <img src={urlImage} alt="" className='categoriesCards-img'/>
        </figure>
        <div className='main-container-categoriesCards-icon'>
          <div className='info-container-categoriesCards'>
            <div className='container-categoriesCards-icon'>
              <div className='container-categoriesCards-content'>
                <figure className='container-figure-icon'>
                  <img src={urlIcon} alt="" className='categoriesCards-icon' />
                </figure>
                <h2 className='categoriesCards-text'>{categoryName}</h2>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
