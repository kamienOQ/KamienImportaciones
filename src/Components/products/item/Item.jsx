import React from 'react';
import { Link } from 'react-router-dom';

export const Item = ({ info }) => {
  return (
    <Link to={`/detalle/${info.id}`} className='products'>
        <img src={ info.image } alt="" />
        <p>{ info.title }</p>
    </Link>
  );
}