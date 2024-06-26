import emptyProducts from '../../assets/emptyProducts.webp';

export const ProductsEmpty = () => {

  return (
    <div className='container-emptyProducts'>
      <img
        src={emptyProducts}
        alt="Empty Product"
        className='emptyProducts-image'
        loading="lazy"
      />
      <h2 style={{ marginTop: '20px', textAlign: 'center' }}>No hay productos disponibles en este momento</h2>
    </div>
  )
}
