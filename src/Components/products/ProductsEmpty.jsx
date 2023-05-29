import emptyProducts from '../../assets/emptyProducts.jpg'

export const ProductsEmpty = ({ product }) => {
  return (
    <div className='container-emptyProducts'>
        <h2>No hay productos disponibles en este momento</h2>
        <img src={emptyProducts} alt="" className='emptyProducts-image' />
    </div>
  )
}
