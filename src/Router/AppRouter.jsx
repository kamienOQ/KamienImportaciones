// import Links from "./Components/Links";
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from '../Pages/Home';
import { ProductsCrud } from "../Pages/ProductsCrud";
import { View } from '../Pages/View';
import { Header } from '../Components/Header';
import { About } from '../Pages/About';

export const AppRouter = () => {
  return (
    <div className="App">
      <Header>
      <ToastContainer position="top-center"/>
      <Routes>
          <Route path="/*" element={ <Home/> }></Route>
          <Route path="/add" element={ <ProductsCrud/> }></Route>
          <Route path="/update/id" element={ <ProductsCrud/> }></Route>
          <Route path="/view/id" element={ <View/> }></Route>
          <Route path="/about" element={ <About/> }></Route>
      </Routes>
      </Header>
    </div>
  )
};
