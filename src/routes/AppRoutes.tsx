import Layout from "@/components/Layout";
import LayoutAdmin from "@/components/LayoutAdmin";
import ListApartments from "@/pages/admin/ListAparts";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import { Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<LayoutAdmin />}>
        <Route path="/admin/list-aparts" element={<ListApartments />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
};

export default AppRoutes;
