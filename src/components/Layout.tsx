import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main ><Outlet /></main>
      <Footer />
    </div>
  );
};

export default Layout;
