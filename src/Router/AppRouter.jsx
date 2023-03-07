// import Links from "./Components/Links";
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import { Home } from '../pages/Home';
import { AddProduct } from "../Pages/AddProduct";
import { View } from '../Pages/View';
import { About } from '../Pages/About';
import { Header } from '../Components/Header';


export const AppRouter = () => {
  return (
    <div className="App">
      <Header>
      <ToastContainer position="top-center"/>
      <Routes>
          <Route path="/*" element={ <Home/> }></Route>
          <Route path="/add" element={ <AddProduct/> }></Route>
          <Route path="/update/id" element={ <AddProduct/> }></Route>
          <Route path="/view/id" element={ <View/> }></Route>
          <Route path="/about" element={ <About/> }></Route>
      </Routes>
      </Header>
    </div>
  )
};
