import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FirebaseDB } from '../Firebase/Firebase';
import { toast } from 'react-toastify';

import './ProductsCrud.css';
import BottomNav from "../Components/BottomNav"

const initialState = {
  Nombre: "", 
  Precio: "", 
  Categoria: "", 
  Atributos: "", 
  Imagen: ""
};

export const ProductsCrud = () => {

  const [ state, setState ] = useState( initialState );
  const [ data, setData ] = useState({});

  const { Nombre, Precio, Categoria, Atributos, Imagen } = state;

  const history = useNavigate();

  const { id } = useParams();

  useEffect( () => {
    FirebaseDB.child("productos").on( "value", (snapshot) => {
        if ( snapshot.val() !== null ) {
            setData( { ...snapshot.val() });
        } else {
            setData( {} );
        }
    });
    
    return () => {
        setData( {} ); 
    };
  }, [id]);

  useEffect(() => {
    if ( id ) {
      setState( { ...data[id] } );
    } else {
      setState( ...initialState );
    }

    return () => {
      setState( ...initialState );
    }
  }, [id, data])
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if( !Nombre || !Precio || !Categoria || !Atributos || !Imagen){
      toast.error("Por favor verificar que esten todos los campos listos para continuar")
    } else {
      if ( !id ) {
        FirebaseDB.child("Productos").push( state, (err) => {
          if( err ){
            toast.error( err );
          } else {
            toast.success("Producto agregado satisfactoriamente")
          }
        });
      } else {
        FirebaseDB.child(`Productos/${id}`).set( state, (err) => {
          if( err ){
            toast.error( err );
          } else {
            toast.success("Producto modificado satisfactoriamente")
          }
        });
      }
      
      setTimeout( () => history.push("/"), 500 );
    }
  };

  return (
    <BottomNav>
      <div style={{ marginTop: "100px"}}>
        <form 
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor='nombre'>Nombre</label>
          <input 
          type="text" 
          id='nombre'
          name="nombre"
          placeholder='Escriba el nombre del producto'
          value={Nombre || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='precio'>Precio</label>
          <input 
          type="number" 
          id='precio'
          name="precio"
          placeholder='Escriba el precio del producto'
          value={Precio || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='categoria'>Categoria</label>
          <input 
          type="text" 
          id='categoria'
          name="categoria"
          placeholder='Escriba la categoria del producto'
          value={Categoria || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='atributos'>Atributos</label>
          <input 
          type="text" 
          id='atributos'
          name="atributos"
          placeholder='Escriba los atributos del producto'
          value={Atributos || ""}
          onChange={handleInputChange}
          />
          <label htmlFor='imagen'>Imágen</label>
          <input 
          type="text" 
          id='imagen'
          name="imagen"
          placeholder='Suba la imagen del producto'
          value={Imagen || ""}
          onChange={handleInputChange}
          />
          <input type="submit" value={ id ? "Update" : "Save" }/>
        </form>
      </div>
    </BottomNav>
  )
};
