import emptyProducts from '../../assets/emptyProducts.jpg'

export const ProductsEmpty = () => {
  return (
    <div className='container-emptyProducts'>
        <img src={emptyProducts} alt="" className='emptyProducts-image' />
        <h2>No hay productos creados</h2>
    </div>
  )
}
