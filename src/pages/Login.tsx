import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useAuth } from "@/context/AuthContext";
import useSpinner from "@/hooks/useLoadingStore";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const Login: React.FC = () => {
  const { loading, setLoading, Spinner } = useSpinner();
  const {login} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: {email: string, password: string}) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
    } catch (error: any) {
      toast.error("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden bg-white">
      {loading ?? <Spinner></Spinner>}
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-lg p-6">
        <CardHeader className="flex flex-col items-center gap-3">
          <a href="/" className="flex items-center gap-2 mb-3">
            <img className="h-8" src={logo} alt="Logo" />
            <span className="text-[#0C3551] font-semibold text-lg md:text-xl">
              Edifício Internacional
            </span>
          </a>
          <CardDescription className="text-center text-sm md:text-base text-gray-600">
            Informe seu e-mail e senha para continuar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm md:text-base text-gray-700">
                E-mail:
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@mail.com"
                {...register("email", { required: "Informe seu e-mail." })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message as string}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm md:text-base text-gray-700">
                  Senha:
                </Label>
                <Link
                  to="/forgot-password"
                  className="hidden text-sm text-blue-900 hover:text-blue-700 transition"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <PasswordInput
                id="password"
                type="password"
                {...register("password", { required: "Informe sua senha." })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message as string}</p>
              )}
            </div>

            <div className="flex flex-col items-center mt-6">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </div>

            <div className="flex justify-center text-gray-600 text-sm md:text-base">
              <span>Não tem uma conta?</span>
              <Link
                to="/register"
                className="ml-1 text-blue-900 hover:text-blue-700 transition"
              >
                Cadastre-se!
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
