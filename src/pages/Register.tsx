import React from "react";
import logo from "@/assets/images/LogoEdificioInternacional.png";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/inputPassword";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-gray-100 px-4">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-lg p-6">
        <CardHeader className="flex flex-col items-center gap-3">
          <a href="/" className="flex items-center gap-2 mb-3">
            <img className="h-8" src={logo} alt="Logo" />
            <span className="text-[#0C3551] font-semibold text-lg">Edifício Internacional</span>
          </a>
          <CardDescription className="text-center text-gray-600">
            Crie sua conta preenchendo os dados abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nome Completo:</Label>
              <Input id="fullName" type="text" placeholder="Seu nome completo" required className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Celular:</Label>
              <Input id="phone" type="tel" placeholder="(99) 99999-9999" required className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cpf">CPF:</Label>
              <Input id="cpf" type="text" placeholder="000.000.000-00" required className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail:</Label>
              <Input id="email" type="email" placeholder="seuemail@mail.com" required className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha:</Label>
              <PasswordInput id="password" type="password" required className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirme a Senha:</Label>
              <PasswordInput id="confirmPassword" type="password" required className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
            </div>
            <Button type="submit" className="w-full rounded-[5px] bg-blue-600 hover:bg-blue-700 transition text-white py-2 shadow-md">
              Criar Conta
            </Button>
            <div className="flex justify-center text-gray-600 text-sm">
              <span>Já tem uma conta?</span>
              <Link to="/login" className="ml-1 text-blue-600 hover:text-blue-800 transition">Entre aqui</Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
