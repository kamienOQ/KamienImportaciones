import emptyCategorites from '../../assets/Cargando.webp';

export const CategoriesEmpty = () => {
  return (
    <div className='container-emptyCategories'>
        <img src={emptyCategorites} alt="" className='Cargando-image' loading="lazy"/>
        <h2>Cargando espere</h2>
    </div>
  )
}
