import { Navigate, Route, Routes } from "react-router-dom";
import { ImportRoutes } from "../Components/routes/importRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<ImportRoutes />} />
    </Routes>
  )
}
