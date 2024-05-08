import { AboutPage } from '../../Pages/AboutPage';
import { CategoriesPage } from '../../Pages/CategoriesPage';
import { MasterPage } from '../MasterPage';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ProductsModalDetail } from '../products/ProductsModalDetail';
import { ProductsPage } from '../../Pages/ProductsPage';
import { useEffect } from 'react';
import ContactInfo from '../Politic/ContactInfo';
import CookiesPolitics from '../Politic/CookiesPolitics';
import DevelopersPage from '../../Pages/DevelopersPage';
import PaymentMethodCard from '../confirm/PaymentMethodCard';
import PrivacyPolitic from '../Politic/PrivacyPolitic';
import TermsAndConditionsPage from '../Politic/TermsAndConditionsPage';
import ThankYouBuyProduct from '../confirm/ThankYouBuyProduct';

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
          <Route path="/PaymenCard" element={<PaymentMethodCard />} /> 
          <Route path="/ThankYouBuyer" element={<ThankYouBuyProduct />} /> 
        </Routes>
      </MasterPage>
    </>
  );
};