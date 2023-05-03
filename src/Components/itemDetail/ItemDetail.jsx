import { useState } from 'react';
import { ItemCount } from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom';

export const ItemDetail = () => {

    const [gotoCart, setGotoCart] = useState(false);

    const onAdd = (quantity) => {
        setGotoCart(true);
    }

  return (
    <div className='container'>
        <div className='detail'>
            <img className='detail_image' src="{data.image}" alt="" />
            <div className='content'>
                <h1>{data.title}</h1>
                {
                    gotoCart
                        ? <Link to={'/cart'}>Terminar Compra</Link>
                        : <ItemCount initial={1} onAdd = { onAdd } />
                }
            </div>
        </div>
    </div>
  )
}