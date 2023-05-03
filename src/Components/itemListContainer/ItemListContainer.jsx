import { useEffect, useState } from 'react';
import { ItemCount } from '../ItemCount/ItemCount';
import { ItemList } from '../itemList/ItemList';
import { useParams } from 'react-router';

export const ItemListContainer = () => {
  const [data, setData] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
    const getData = new Promise( resolve => {
      setTimeout(() => {
        resolve('products');
      }, 3000);
    })
    if (categoryId) {
      getData.then( res => res.filter( category => category.category === categoryId ));
    } else {
      getData.then( res => setData(res) );
    }
    
  }, [categoryId]);

  

  return (
    <>
      <ItemList data = {data} />
    </>
  )
}
