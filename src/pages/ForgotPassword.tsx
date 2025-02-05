import React from "react";
import logo from "@/assets/images/LogoEdificioInternacional.png";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-gray-100 px-4">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-lg p-6">
        <CardHeader className="flex flex-col items-center gap-3">
          <a href="/" className="flex items-center gap-2 mb-3">
            <img className="h-8" src={logo} alt="Logo" />
            <span className="text-[#0C3551] font-semibold text-lg">Edifício Internacional</span>
          </a>
          <CardDescription className="text-center text-gray-600">
            Informe seu e-mail para redefinir sua senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail:</Label>
              <Input id="email" type="email" placeholder="seuemail@mail.com" required className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
            </div>
            <Button type="submit" className="w-full rounded-[5px] bg-blue-600 hover:bg-blue-700 transition text-white py-2 shadow-md">
              Enviar link de redefinição
            </Button>
            <div className="flex justify-center text-gray-600 text-sm">
              <Link to="/login" className="text-blue-600 hover:text-blue-800 transition">Voltar para o login</Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
