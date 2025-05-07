import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/inputPassword";
import logo from "@/assets/images/new-logo.png";
import { Button } from "@/components/ui/button";

const ResetPassword: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-gray-50 to-gray-100">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-lg p-6">
        <CardHeader className="flex flex-col items-center text-gray-600">
          <div className="flex items-center gap-2 mb-3">
            <img className="h-16" src={logo} alt="Logo" />
          </div>
          <CardDescription className="text-center text-gray-600">
            Defina sua nova senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Nova senha:</Label>
              <PasswordInput
                id="password"
                type="password"
                required
                className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirme sua senha:</Label>
              <PasswordInput
                id="confirmPassword"
                type="password"
                required
                className="rounded-[5px] border border-gray-300 px-3 py-2 focus:ring-2"
              />
            </div>
            <Button type="submit" className="mt-6">
              Redefinir Senha
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
