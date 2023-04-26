import camisetaImg from '../../assets/camisetaImg.jpg'
import camiseta from '../../assets/camiseta.png'

export const CategoriesCards = () => {
  return (
    <div className='container-categoriesCards'>
      <div className='container-categoriesCards-img'>
        <img src={camisetaImg} alt="" className='categoriesCards-img'/>
      </div>
      {/* <div className='main-container-categoriesCards-icon'>
        <div className='container-categoriesCards-icon'>
          <img src={camiseta} alt="" />
          <p></p>
        </div>
      </div> */}
    </div>
  )
}
