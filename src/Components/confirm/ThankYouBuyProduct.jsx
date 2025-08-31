import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChayGif from '../../assets/ChayThanks.gif';
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
                    <Typography variant="h3">Muchas gracias por la compra de los productos de ChayCR</Typography>
                </div>
                <img src={ChayGif} alt="Gif de agradecimiento" />
            </div>
        </div>
    )
}

export default ThankYouBuyProduct