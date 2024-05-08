import React from 'react';
import KamienGif from '../../assets/KámienStore.gif';
import { Typography } from '@mui/material';

const ThankYouBuyProduct = () => {
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