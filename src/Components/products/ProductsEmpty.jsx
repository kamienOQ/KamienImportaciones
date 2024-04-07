import emptyProducts from '../../assets/emptyProducts.jpg';

export const ProductsEmpty = () => {
  return (
    <div className='container-emptyProducts'>
        <img src={emptyProducts} alt="" className='emptyProducts-image' loading="lazy"/>
        <h2>No hay productos disponibles en este momento</h2>
    </div>
  )
}
