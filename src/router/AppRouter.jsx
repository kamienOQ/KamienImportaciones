import { Navigate, Route, Routes } from 'react-router-dom';
import { ImportRoutes } from '../Components/routes/ImportRoutes';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<ImportRoutes />} />
    </Routes>
  )
}
