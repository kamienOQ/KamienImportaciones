import { Navigate, Route, Routes } from "react-router-dom";
import { MasterPage } from "../MasterPage";
import { CategoriesPage } from "../../Pages/CategoriesPage";
import { ProductsPage } from "../../Pages/ProductsPage";

export const ImportRoutes = () => {
  return (
    <>
    <MasterPage>
     <Routes>
       {/* <Route path="/" element={<MasterPage />} /> */}
       <Route path="/" element={<CategoriesPage />} />
       <Route path="/CategoriasProductos/:categoryId" element={<ProductsPage />} />
       {/*<Route path= "/Producto" element = {<ProductsCrud/>}/>
       <Route path= "/Categorias" element = {<CategoriesCrud/>}/>
       <Route path= "/Atributos" element = {<AttibutesCrud/>}/> */}
       <Route path="/*" element={<Navigate to="/" />} />
     </Routes>
    </MasterPage>
   </>
  );
};

