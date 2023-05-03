import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const ItemListContainer = () => {
    const [data, setData] = useState({});

    const { categoryId } = useParams();

    useEffect(() => {
        const queryDb = FirebaseDB;
        const queryCollection = collection(queryDb, 'products');
        const queryFilter = query(queryCollection, where('category', '==', categoryId));
        if (categoryId) {
        getDocs(queryFilter)
            .then( res => setData(res.docs.map( product => ({ id: res.id, ...res.data() })))) 
        } else {
        getDocs(queryCollection)
            .then( res => setData(res.docs.map( product => ({ id: res.id, ...res.data() }))))
        }
    }, [categoryId])

    return (
        <>
        <ItemList data = { data } />
        </>
    );
}
