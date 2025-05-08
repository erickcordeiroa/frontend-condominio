import Layout from "@/components/Layout";
import LayoutAdmin from "@/components/LayoutAdmin";
import CreateFraction from "@/pages/admin/fraction/create-fraction";
import EditFraction from "@/pages/admin/fraction/edit-fraction";
import ListFraction from "@/pages/admin/fraction/list-fraction";
import CreateProperty from "@/pages/admin/property/create-property";
import EditProperty from "@/pages/admin/property/edit-property";
import ListApartments from "@/pages/admin/property/list-property";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import PropertyDetail from "@/pages/PropertyDetail";
import PropertyList from "@/pages/PropertyList";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import Simulator from "@/pages/Simulator";
import { Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/simulador" element={<Simulator />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/properties/:type" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Route>

      <Route path='' element={<LayoutAdmin />}>
        <Route path="/admin/properties" element={<ListApartments />} />
        <Route path="/admin/property/create" element={<CreateProperty />} />
        <Route path="/admin/property/edit/:id" element={<EditProperty />} />

        <Route path="/admin/fractions" element={<ListFraction />} />
        <Route path="/admin/fraction/create" element={<CreateFraction />} />
        <Route path="/admin/fraction/edit/:id" element={<EditFraction />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
};

export default AppRoutes;
