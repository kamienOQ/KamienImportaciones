import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { onGetProductsByCategory } from '../../../store/products/thunks';
import { ItemList } from '../itemList/ItemList';

export const ItemListContainer = () => {

  const [data, setData] = useState({});

  const { categoryId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetProductsByCategory(categoryId));
  }, [categoryId])
    

  return (
    <>
      <ItemList data = {data} />
    </>
  )
}
