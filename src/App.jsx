//import "./App.css";
import { Route, Routes } from "react-router";
import { MasterPage } from "./Components/MasterPage";
import { ItemDetailContainer } from "./Components/itemDetailContainer/ItemDetailContainer";
import { Cart } from "./kamien/Cart";
import { Navbar } from "./kamien/Navbar";
import { CategoriesPage } from "./Pages/categoriesPage";

export const App = () => {
  return (
    <>
     <Navbar />
      <Routes>
        <Route path="/" element={<MasterPage />} />
        <Route path="/Categorias" element={<CategoriesPage />} />
        <Route path="/CategoriasProductos/:categoryId" element={<ItemDetailContainer/>} />
        <Route path= "/Carrito" element = {<Cart/>} />
        <Route path= "/detalle/:detailledId" element = {<ItemDetailContainer/>} />
        {/*<Route path= "/Producto" element = {<ProductsCrud/>}/>
        <Route path= "/Categorias" element = {<CategoriesCrud/>}/>
        <Route path= "/Atributos" element = {<AttibutesCrud/>}/> */}
        {/* <Route path="/*" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
};
