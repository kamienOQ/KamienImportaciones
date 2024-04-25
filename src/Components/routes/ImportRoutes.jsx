import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { MasterPage } from '../MasterPage';
import { CategoriesPage } from '../../Pages/CategoriesPage';
import { AboutPage } from '../../Pages/AboutPage';
import { ProductsPage } from '../../Pages/ProductsPage';
import { ProductsModalDetail } from '../products/ProductsModalDetail';
import DevelopersPage from '../../Pages/DevelopersPage';
import { useEffect } from 'react';
import TermsAndConditionsPage from '../Politic/TermsAndConditionsPage';
import CookiesPolitics from '../Politic/CookiesPolitics';
import PrivacyPolitic from '../Politic/PrivacyPolitic';
import ContactInfo from '../Politic/ContactInfo';

// Define la función scrollToTop aquí
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export const ImportRoutes = () => {
  const navigate = useNavigate();

  // Esta función se ejecutará cada vez que cambie la ruta
  useEffect(() => {
    scrollToTop(); // Llama a la función para desplazar hacia arriba
  }, [navigate]); // Ejecutar cuando cambie la ruta

  return (
    <>
      <MasterPage>
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/ProductoDetalle" element={<ProductsModalDetail />} />
          <Route path="/Producto" element={<ProductsPage />} />
          <Route path="/Categorias" element={<CategoriesPage />} />
          <Route path="/Nosotros" element={<AboutPage />} />
          <Route path="/Desarrolladores" element={<DevelopersPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/politica-cookies" element={<CookiesPolitics />} />
          <Route path="/policy-politics" element={<PrivacyPolitic />} />  
          <Route path="/contact-info" element={<ContactInfo />} />      
        </Routes>
      </MasterPage>
    </>
  );
};