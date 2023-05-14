import { Navigate, Route, Routes } from "react-router-dom";
import { MasterPage } from "../MasterPage";
import { CategoriesPage } from "../../Pages/CategoriesPage";
import { AboutPage } from "../../Pages/AboutPage";
import { ProductsPage } from "../../Pages/ProductsPage";
import { ProductsModalDetail } from "../products/ProductsModalDetail";

export const ImportRoutes = () => {
  return (
    <>
    <MasterPage>
     <Routes>
       {/* <Route path="/" element={<MasterPage />} /> */}
       <Route path="/" element={<CategoriesPage />} />
       <Route path="/ProductoDetalle" element={<ProductsModalDetail />} />
       <Route path= "/Producto" element = {<ProductsPage />}/>
       <Route path= "/Categorias" element = {<CategoriesPage/>}/>
       <Route path= "/Nosotros" element = {<AboutPage/>}/>
       <Route path="/*" element={<Navigate to="/" />} />
     </Routes>
    </MasterPage>
   </>
  );
};
