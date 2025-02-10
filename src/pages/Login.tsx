import React from "react";
import logo from "@/assets/images/LogoEdificioInternacional.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { PasswordInput } from "@/components/ui/inputPassword";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-gray-50 to-gray-100">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-lg p-6">
        <CardHeader className="flex flex-col items-center gap-3">
          <a href="/" className="flex items-center gap-2 mb-3">
            <img className="h-8" src={logo} alt="Logo" />
            <span className="text-[#0C3551] font-semibold text-lg">
              Edifício Internacional
            </span>
          </a>
          <CardDescription className="text-center text-gray-600">
            Informe seu e-mail e senha para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm text-gray-700">
                E-mail:
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@mail.com"
                required
                className="w-full rounded-[5px] border border-gray-300 px-3 py-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm text-gray-700">
                  Senha:
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-900 hover:text-blue-700 transition"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <PasswordInput
                id="password"
                type="password"
                required
                className="w-full rounded-[5px] border border-gray-300 px-3 py-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400"
              />
            </div>

            <div className="flex flex-col items-center mt-6">
              <Button
                type="submit"
                className="w-full"
              >
                Entrar
              </Button>
            </div>

            <div className="flex justify-center text-gray-600 text-sm">
              <span>Não tem uma conta?</span>
              <Link
                to="/register"
                className="ml-1 text-blue-900 hover:text-blue-700 transition"
              >
                Cadastre-se!
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
