import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const ItemDetailContainer = () => {
    const [data, setData] = useState({});
    const { detailledId } = useParams();
  
    useEffect(() => {
      const queryDb = FirebaseDB;
      const queryDoc = doc(queryDb, 'products', detailledId);
      getDoc(queryDoc)
      .then( res => setData({ id: res.id, ...res.data() })) 
    }, [])
    
    return (
      <ItemDetail data = { data } />
    );
}
