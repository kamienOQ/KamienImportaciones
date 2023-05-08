import { Navigate, Route, Routes } from "react-router-dom";
import { MasterPage } from "../MasterPage";
import { CategoriesPage } from "../../Pages/CategoriesPage";
import { AboutPage } from "../../Pages/AboutPage";

export const ImportRoutes = () => {
  return (
    <>
    <MasterPage>
     <Routes>
       {/* <Route path="/" element={<MasterPage />} /> */}
       <Route path="/" element={<CategoriesPage />} />
       {/* <Route path="/CategoriasProductos/:categoryId" element={<ProductsPage />} /> */}
       {/*<Route path= "/Producto" element = {<ProductsCrud/>}/> */}
       <Route path= "/Categorias" element = {<CategoriesPage/>}/>
       <Route path= "/Nosotros" element = {<AboutPage/>}/>
       <Route path="/*" element={<Navigate to="/" />} />
     </Routes>
    </MasterPage>
   </>
  );
};