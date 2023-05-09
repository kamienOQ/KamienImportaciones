import { Navigate, Route, Routes } from "react-router-dom";
import { MasterPage } from "../MasterPage";
import { CategoriesPage } from "../../Pages/CategoriesPage";
import { ProductsPage } from "../../Pages/ProductsPage";
import { ItemListContainer } from "../products/itemListContainer/ItemListContainer";

export const ImportRoutes = () => {
  return (
    <>
    <MasterPage>
     <Routes>
       {/* <Route path="/" element={<MasterPage />} /> */}
       <Route path="/" element={<ProductsPage />} />
       {/* <Route path="/CategoriasProductos" element={<CategoriesPage />} /> */}
       <Route path= "/Productos" element = {<ProductsPage />}/>
       {/*<Route path= "/Categorias" element = {<CategoriesCrud/>}/>
       <Route path= "/Atributos" element = {<AttibutesCrud/>}/> */}
       <Route path="/*" element={<Navigate to="/" />} />
     </Routes>
    </MasterPage>
   </>
  );
};
