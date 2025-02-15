import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "@/assets/images/LogoEdificioInternacional.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="h-[60px] bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-lg font-bold flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <img className="h-6" src={logo} alt="Logo" />
        <span className="text-[#0C3551]">Edifício Internacional</span>
      </div>

      <nav className="hidden md:flex gap-4">
        <Button variant="ghost" onClick={() => navigate('/properties')}>Propriedades</Button>
        <Button variant="ghost" onClick={() => navigate('/login')}>Entrar</Button>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="flex flex-col gap-4 mt-6">
            <Button variant="ghost">Propriedades</Button>
            <Button variant="ghost">Entrar</Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
