import emptyCategorites from '../../assets/emptyCategories.jpg'

export const CategoriesEmpty = () => {
  return (
    <div className='container-emptyCategories'>
        <img src={emptyCategorites} alt="" className='emptyCategories-image' />
        <h2>No hay categorías creadas</h2>
    </div>
  )
}
