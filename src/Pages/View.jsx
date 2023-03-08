import { useState, useEffect } from 'react';
import { FirebaseDB } from '../Firebase/Firebase';
import { useNavigate, useParams , Link } from 'react-router-dom';
import './View.css';

export const View = () => {

  const [ user, setUser ] = useState({});

  const { id } = useParams()

  useEffect(() => {
    FirebaseDB
      .child(`productos/$(id)`)
      .get()
      .then( (snapshot) => {
        if ( snapshot.exist()) {
          setUser( { ...snapshot.val() });
        } else {
          setUser( {} );
        }
      });
  }, [id])
  
  console.log( "user", user );

  return (
    <div style={ {marginTop: "150px"} }>
      <div className="card">
        <div className="card-header">
          <p>Detalles del producto</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Nombre:</strong>
          <span>{user.Nombre}</span>
          <br/>
          <br/>
          <strong>Precio:</strong>
          <span>{user.Precio}</span>
          <br/>
          <br/>
          <strong>Categoria:</strong>
          <span>{user.Categoria}</span>
          <br/>
          <br/>
          <strong>Atributos:</strong>
          <span>{user.Atributos}</span>
          <br/>
          <br/>
          <strong>Imagen:</strong>
          <span>{user.Imagen}</span>
          <br/>
          <br/>

          <Link to={"/"}>
            <button className='btn btn-edit'>Retroceder</button>
          </Link>

        </div>
      </div>
    </div>
  )
}