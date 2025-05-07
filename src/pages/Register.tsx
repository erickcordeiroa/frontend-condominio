import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import logo from "@/assets/images/new-logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/inputPassword";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "@/service/apiService";
import useSpinner from "@/hooks/useLoadingStore";
import { toast } from "react-toastify";

const schema = z.object({
  fullName: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const Register: React.FC = () => {
  const { loading, setLoading } = useSpinner();
  const api = useApi();
  const navigate = useNavigate();

  type FormValues = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  /*
  const formatCPF = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    return match ? `${match[1]}.${match[2]}.${match[3]}-${match[4]}` : value;
  };*/

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await api.post("/register", {
        name: data.fullName,
        email: data.email,
        password: data.password,
        status: "ativo",
        role: "user",
      });
      toast.success("Cadastro realizado com sucesso!");

      navigate("/login");
    } catch (error) {
      toast.error("Ocorreu um erro ao criar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-lg md:p-6">
        <CardHeader className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 mb-3">
            <img className="h-16" src={logo} alt="Logo" />
          </div>
          <CardDescription className="text-center text-sm md:text-base text-gray-600">
            Crie sua conta preenchendo os dados abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nome Completo:</Label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input id="fullName" {...field} placeholder="Seu nome" />
                )}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">E-mail:</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    {...field}
                    placeholder="seuemail@mail.com"
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha:</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput id="password" {...field} />
                )}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center mt-6">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Aguarde..." : "Criar Conta"}
              </Button>
            </div>

            <div className="flex justify-center text-gray-600 text-sm md:text-base">
              <Link
                to="/login"
                className="ml-1 text-blue-900 hover:text-blue-700 transition"
              >
                Voltar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
