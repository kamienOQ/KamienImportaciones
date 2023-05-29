import emptyProducts from '../../assets/emptyProducts.jpg'

export const ProductsEmpty = ({ product }) => {
  return (
    <div className='container-emptyProducts'>
        <img src={emptyProducts} alt="" className='emptyProducts-image' />
        <h2>No hay productos disponibles en este momento</h2>
    </div>
  )
}
