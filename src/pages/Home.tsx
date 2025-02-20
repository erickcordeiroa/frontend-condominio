import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { useApi } from "@/service/apiService";
import useSpinner from "@/hooks/useLoadingStore";
import { IFraction } from "@/types/Fraction";
import imgEdif1 from "@/assets/images/ed_inter01.jpg";
import imgEdif2 from "@/assets/images/ed_inter02.jpg";
import imgEdif3 from "@/assets/images/ed_inter03.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const api = useApi();
  const { loading, setLoading, Spinner } = useSpinner();
  const [result, setResult] = useState<number | null>(null);
  const [fraction, setFractions] = useState<IFraction[]>([]);

  const schema = z.object({
    type: z.enum(["LOJA", "APTO"]),
    location: z
      .string()
      .min(1, "A localização é obrigatória")
      .refine(
        (val) => fraction.some((f) => f.location === val),
        "Número não encontrado."
      ),
    rateio: z.string().min(1, "Informe um valor válido"),
  });

  type calcFormValues = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<calcFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "LOJA",
      location: "",
      rateio: "0",
    },
  });

  const rateioValue = watch("rateio");

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const floatValue = (parseFloat(numericValue) / 100).toFixed(2);

    return floatValue.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getList = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/fractions");

      setFractions(data);
    } catch (error) {
      console.error("Erro ao listar propriedades:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = (data: calcFormValues) => {
    const { type, location, rateio } = data;

    const rateioFormatted = parseFloat(
      rateio.replace(/\./g, "").replace(",", ".")
    );
    const findFraction = fraction.find(
      (item: IFraction) => item.location === location && item.type === type
    );

    if (!findFraction) {
      alert("Localização não encontrada para o tipo selecionado.");
      return;
    }

    const valueToPay = rateioFormatted * findFraction.fraction;
    console.log(valueToPay);
    setResult(valueToPay);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 bg-white gap-12 overflow-hidden">
      <div className="flex flex-col items-center md:mr-5 lg:mr-14 md:w-1/2">
        <div className="flex flex-col text-[#0C3551] text-center mb-8">
          <span className="text-lg md:text-xl lg:text-2xl font-semibold mb-1">
            Seja bem-vindo ao
          </span>
          <span className="text-lg md:text-2xl lg:text-4xl font-bold mb-3">
            Edifício
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-900">
            Internacional
          </span>
        </div>

        <div className="w-full max-w-md flex justify-center items-center">
          <Swiper
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="rounded h-[250px] lg:h-[400px] flex items-center justify-center"
          >
            <SwiperSlide className="flex justify-center">
              <img
                src={imgEdif1}
                alt="Imagem do Edifício"
                className="w-full h-full object-cover rounded shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                src={imgEdif2}
                alt="Imagem do Edifício"
                className="w-full h-full object-cover rounded shadow-lg"
              />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <img
                src={imgEdif3}
                alt="Imagem do Edifício"
                className="w-full h-full object-cover rounded shadow-lg"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <Link
          to="/properties"
          className="text-sm md:text-base lg:text-xl text-blue-900 hover:text-blue-700 transition mt-10 md:mt-16 cursor-pointer"
        >
          Veja nossas propriedades
        </Link>
      </div>

      <div className="w-full md:w-1/2 lg:w-[40%] bg-white px-8 py-10 rounded-3xl shadow-2xl flex flex-col justify-center">
        <h2 className="text-center text-lg md:text-xl lg:text-2xl font-bold text-[#09273c] mt-2 md:mt-4 mb-6 md:mb-10">
          Simule o valor do rateio do condomínio
        </h2>
        <form
          onSubmit={handleSubmit(handleCalculate)}
          className="space-y-6 md:space-y-8"
        >
          <div>
            <Label className="text-sm md:text-base font-medium text-gray-700">
              Selecione o tipo:
            </Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-center space-x-3">
                      <RadioGroupItem value="LOJA" id="LOJA" />
                      <Label
                        htmlFor="LOJA"
                        className="text-sm mb-0 md:text-base"
                      >
                        Loja
                      </Label>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <RadioGroupItem value="APTO" id="APTO" />
                      <Label
                        htmlFor="APTO"
                        className="text-sm mb-0 md:text-base"
                      >
                        Apartamento
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="location"
              className="text-sm md:text-base font-medium text-gray-700"
            >
              Número do seu apartamento ou loja:
            </Label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Ex: 09"
                  className="mt-2"
                  onChange={(e) =>
                    setValue(
                      "location",
                      Number(e.target.value).toString().padStart(2, "0")
                    )
                  }
                />
              )}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="rateio"
              className="text-sm md:text-base font-medium text-gray-700"
            >
              Valor do Rateio (R$):
            </Label>
            <Controller
              name="rateio"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Ex: 150,00"
                  className="mt-2"
                  value={formatCurrency(rateioValue)}
                  onChange={(e) =>
                    setValue("rateio", formatCurrency(e.target.value))
                  }
                />
              )}
            />
            {errors.rateio && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rateio.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Calcular
          </Button>

          {result !== null && (
            <div className="text-center mt-4 text-base md:text-xl text-gray-900">
              <p>Valor a pagar</p>
              <p className="font-bold">
                R$ {formatCurrency(result.toString())}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
