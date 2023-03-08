import { useState, useEffect } from 'react';
import { FirebaseDB } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';

export const Home = () => {

    const [ data, setData ] = useState({});

    useEffect( () => {
        FirebaseDB.child("Productos").on( "value", (snapshot) => {
            if ( snapshot.val() !== null ) {
                setData( { ...snapshot.val() });
            } else {
                setData( {} );
            }
        });
        
        return () => {
            setData( {} ); 
        };
    }, []);

    const onDelete = (id) => {
        if (
            window.confirm("¿Está seguro de querer borrar el producto?")
        ) {
            FirebaseDB.child(`productos/${id}`).remove( (err) => {
                if ( err ) {
                    toast.error( err );
                } else {
                    toast.success("Contacto borrado exitosamente")
                }
            });
        }
    };

  return (
    <div style={ {marginTop: "100px"} }>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={ {textAlign: "center"} }>No.</th>
                    <th style={ {textAlign: "center"} }>Nombre</th>
                    <th style={ {textAlign: "center"} }>Precio</th>
                    <th style={ {textAlign: "center"} }>Categoria</th>
                    <th style={ {textAlign: "center"} }>Atributos</th>
                    <th style={ {textAlign: "center"} }>Imagen</th>
                    <th style={ {textAlign: "center"} }>Accion</th>
                </tr>
            </thead>
            <tbody>
                { Object.keys(data).map( (id, index) => {
                    return (
                        <tr key={id}>
                            <th scope='row'>{ index + 1 }</th>
                            <td>{ data[id].nombre }</td>
                            <td>{ data[id].precio }</td>
                            <td>{ data[id].categoria }</td>
                            <td>{ data[id].atributos }</td>
                            <td>{ data[id].imagen }</td>
                            <td>
                                <Link to={`/update/${id}`}>
                                    <button className='btn btn-edit'>Editar</button>
                                </Link>
                                <button 
                                className='btn btn-delete'
                                onClick={ () => onDelete(id)}
                                >
                                    Borrar
                                </button>
                                <Link to={`/view/${id}`}>
                                    <button className='btn btn-view'>Editar</button>
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
};
