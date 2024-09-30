import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import KamienGif from '../../assets/KámienStore.gif';
import { Typography } from '@mui/material';
import { onChangeSuccess } from '../../store/buying/buyingSlice';
import { onCleanProducts } from '../../store/cart/cartSlice';

const ThankYouBuyProduct = () => {
    const dispatch = useDispatch();

    dispatch(onChangeSuccess(true));
    dispatch(onCleanProducts());

    return (
        <div className='main-thanks-container'>
            <div className='thanks-container'>
                <div className='thanks-title-container'>
                    <Typography variant="h3">Muchas gracias por la compra de los productos de Kámien</Typography>
                </div>
                <img src={KamienGif} alt="Gif de agradecimiento" />
            </div>
        </div>
    )
}

export default ThankYouBuyProduct