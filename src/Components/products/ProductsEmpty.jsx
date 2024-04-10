import { useState } from 'react';
import emptyProducts from '../../assets/emptyProducts.jpg';

export const ProductsEmpty = () => {

  return (
    <div className='container-emptyProducts'>
      <img
        src={emptyProducts}
        alt="Empty Product"
        className='emptyProducts-image'
        loading="lazy"
      />
      
    </div>
  )
}
