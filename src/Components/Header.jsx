import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export const Header = () => {

    const [ activeTab, setActiveTab ] = useState("Home");
    const location = useLocation();

    useEffect(() => {
      if ( location.pathname === "/" ){
        setActiveTab("Home")
      } else if ( location.pathname === "/add" ) {
            setActiveTab("AddProduct")
      } else if ( location.pathname === "/view" ) {

      } else if ( location.pathname === "/about" ) {
            setActiveTab("About")
      }
    }, [location])
    

  return (
    <div className='header'>
        <p className='logo'>Kámien</p>
        <div className='header-right'>
            <Link to="/">
                <p 
                    className={`${activeTab === "Home" ? "active": ""}`}
                    onClick={() => setActiveTab("Home")}
                >
                    Inicio
                </p>
            </Link>
            <Link to="/add">
                <p 
                    className={`${activeTab === "AddProduct" ? "active": ""}`}
                    onClick={() => setActiveTab("AddProduct")}
                >
                    Agregar Producto
                </p>
            </Link>
            <Link to="/view">
                <p 
                    className={`${activeTab === "ViewProduct" ? "active": ""}`}
                    onClick={() => setActiveTab("ViewProduct")}
                >
                    Visualizar Producto
                </p>
            </Link>
            <Link to="/about">
                <p 
                    className={`${activeTab === "About" ? "active": ""}`}
                    onClick={() => setActiveTab("About")}
                >
                    Acerca de
                </p>
            </Link>
        </div>
        
    </div>
  )
};
