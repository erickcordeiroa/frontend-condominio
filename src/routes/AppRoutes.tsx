import Layout from "@/components/Layout";
import LayoutAdmin from "@/components/LayoutAdmin";
import CreateProperty from "@/pages/admin/property/create-property";
import EditProperty from "@/pages/admin/property/edit-property";
import ListApartments from "@/pages/admin/property/list-property";
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
        <Route path="/admin/property/list" element={<ListApartments />} />
        <Route path="/admin/property/create" element={<CreateProperty />} />
        <Route path="/admin/property/edit/:id" element={<EditProperty />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
};

export default AppRoutes;
