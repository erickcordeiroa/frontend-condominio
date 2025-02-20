import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col justify-between">
      <Header />
      <main className="flex-1 bg-white"><Outlet /></main>
      <Footer />
    </div>
  );
};

export default Layout;
