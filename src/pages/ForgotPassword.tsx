import React from "react";
import logo from "@/assets/images/LogoEdificioInternacional.png";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-gray-50 to-gray-100">
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
              <Button className="mt-6" type="submit">Enviar link de redefinição</Button>
            <div className="flex justify-center text-gray-600 text-sm">
              <Link to="/login" className="text-blue-900 hover:text-blue-700 transition">Voltar para o login</Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
