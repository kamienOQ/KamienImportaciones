import Links from "./Components/Links";
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from "./pages/Home";
import { AddEdit } from "./Pages/AddEdit";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*" component={ <Home/>}></Route>
        <Route path="/add" component={<AddEdit/>}></Route>
        <Route path="/update/id" component={<AddEdit/>}></Route>
        <Route path="/view/id" component={<View/>}></Route>
    </Routes>
  )
}
