import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/new-logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-slate-100 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] px-6 h-[80px] flex items-center justify-between relative z-10">
      <div 
        className="text-lg font-bold flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img className="h-8" src={logo} alt="Logo" />
      </div>


      <nav className="hidden md:flex gap-6">
      <Button variant="ghost" className="text-base hover:text-[#286893]" onClick={() => navigate('/login')}>Entrar</Button>
      </nav>

      {/* Menu Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <nav className="flex flex-col gap-4 mt-6">
            <Button variant="ghost" className="text-sm hover:text-[#286893]" onClick={() => navigate('/login')}>Entrar</Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
