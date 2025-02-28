import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/service/apiService";
import useSpinner from "@/hooks/useLoadingStore";
import { IFraction } from "@/types/Fraction";
import imgEdif1 from "@/assets/images/ed_inter01.jpg";
import imgEdif2 from "@/assets/images/ed_inter02.jpg";
import imgEdif3 from "@/assets/images/ed_inter03.jpg";
import logoFachada from "@/assets/images/logo-fachada.svg";
import ImgBackground from "@/assets/images/background-form.png";

export default function Home() {
  const api = useApi();
  const navigate = useNavigate();
  const { setLoading } = useSpinner();
  const [result, setResult] = useState<string | null>(null);
  const [fraction, setFractions] = useState<IFraction[]>([]);
  const [isValidLocation, setIsValidLocation] = useState<boolean>(true);

  const schema = z.object({
    type: z.enum(["LOJA", "APTO"]),
    location: z
      .string()
      .min(1, "A localização é obrigatória")
      .refine(
        (val) => fraction.some((f) => f.location === val.padStart(2, "0")),
        "Digite o número de um imóvel válido!"
      ),
    rateio: z.string().min(1, "Informe um valor válido"),
  });

  type calcFormValues = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<calcFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "LOJA",
      location: "",
      rateio: "",
    },
  });

  const rateioValue = watch("rateio");
  const locationValue = watch("location");
  const typeValue = watch("type");

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
    const formattedLocation = location.padStart(2, "0");
    const findFraction = fraction.find(
      (item: IFraction) =>
        item.location === formattedLocation && item.type === type
    );

    if (!findFraction) {
      return;
    }

    const valueToPay = (rateioFormatted * findFraction.fraction).toFixed(2);
    setResult(formatCurrency(valueToPay.toString()));
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setIsValidLocation(true);
  };

  const formSectionRef = useRef<HTMLElement | null>(null);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    const formattedLocation = locationValue.padStart(2, "0");
    const findFraction = fraction.find(
      (item: IFraction) =>
        item.location === formattedLocation && item.type === typeValue
    );
    setIsValidLocation(!!findFraction);
  }, [locationValue, typeValue, fraction]);

  useEffect(() => {
    const rateioFormatted = parseFloat(
      rateioValue.replace(/\./g, "").replace(",", ".")
    );
    const formattedLocation = locationValue.padStart(2, "0");
    const findFraction = fraction.find(
      (item: IFraction) =>
        item.location === formattedLocation && item.type === typeValue
    );

    if (findFraction && rateioFormatted) {
      const valueToPay = (rateioFormatted * findFraction.fraction).toFixed(2);
      setResult(formatCurrency(valueToPay.toString()));
    } else {
      setResult(null);
    }
  }, [rateioValue, locationValue, typeValue, fraction]);

  return (
    <div className="flex flex-col min-h-screen bg-white gap-12">

      <section className="w-full flex flex-col items-center">
        <div
          className="grid grid-cols-3 grid-rows-3 gap-6 lg:gap-12 w-full max-w-7xl h-[75vh] mt-6 mb-6"
          style={{ gridTemplateAreas: '"a a d" "b b d" "b b c"' }}
        >
          <img
            src={logoFachada}
            alt="Imagem logo"
            className="w-full h-full object-contain opacity-0 transition-opacity duration-3000 delay-200"
            style={{ gridArea: "a" }}
            onLoad={(e) =>
              (e.target as HTMLImageElement).classList.remove("opacity-0")
            }
          />

          <img
            src={imgEdif3}
            alt="Imagem 1"
            className="w-full h-full object-cover opacity-0 transition-opacity duration-1000 delay-100"
            style={{ gridArea: "d" }}
            onLoad={(e) =>
              (e.target as HTMLImageElement).classList.remove("opacity-0")
            }
          />

          <img
            src={imgEdif1}
            alt="Imagem 2"
            className="w-full h-full object-cover opacity-0 transition-opacity duration-1000 delay-300"
            style={{ gridArea: "b" }}
            onLoad={(e) =>
              (e.target as HTMLImageElement).classList.remove("opacity-0")
            }
          />

          <img
            src={imgEdif2}
            alt="Imagem 3"
            className="w-full h-full object-cover opacity-0 transition-opacity duration-1000 delay-500"
            style={{ gridArea: "c" }}
            onLoad={(e) =>
              (e.target as HTMLImageElement).classList.remove("opacity-0")
            }
          />
        </div>

        <div className="flex gap-6 lg:gap-12 mt-10">
          <Button
            className="text-base md:text-lg hover:border-gray-500 md:px-4 md:py-6"
            type="button"
            variant={"outline"}
            onClick={() => navigate("/properties")}
          >
            Veja nossos imóveis
          </Button>
          <Button
            onClick={scrollToForm}
            className="text-base md:text-lg md:px-4 md:py-6"
            type="button"
            variant={"default"}
          >
            Simule os Valores
          </Button>
        </div>
      </section>

      <section
        ref={formSectionRef}
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${ImgBackground})` }}
      >
        <div className="absolute inset-0 bg-white opacity-70"></div>
        <div className="relative bg-white p-6 lg:p-12 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-center text-lg md:text-xl lg:text-3xl font-bold text-[#09273c] mt-2 md:mt-4 mb-6 md:mb-10">
            Simule o valor do rateio do condomínio
          </h2>
          <form
            onSubmit={handleSubmit(handleCalculate)}
            className="space-y-8 md:space-y-10"
          >
            <div>
              <Label className="text-base md:text-lg lg:text-xl font-medium text-gray-700">
                Selecione o tipo do imóvel:
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
                          className="text-base mb-0 md:text-lg"
                        >
                          Loja
                        </Label>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <RadioGroupItem value="APTO" id="APTO" />
                        <Label
                          htmlFor="APTO"
                          className="text-base md:text-lg mb-0 "
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
                className="text-base md:text-lg lg:text-xl font-medium text-gray-700"
              >
                Digite o número do seu apartamento ou loja:
              </Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-2 p-6 text-xl lg:p-8 md:text-2xl"
                    placeholder="Exemplo: 08"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setValue("location", value);
                    }}
                  />
                )}
              />
              {!isValidLocation && locationValue && (
                <p className="text-red-500 text-base mt-1">
                  Digite o número de um imóvel válido!
                </p>
              )}
              {errors.location && (
                <p className="text-red-500 text-base mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="rateio"
                className="text-base md:text-lg lg:text-xl font-medium text-gray-700"
              >
                Digite o valor do rateio (R$):
              </Label>
              <Controller
                name="rateio"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Exemplo: 150,00"
                    className="mt-2 p-6 text-xl lg:p-8 lg:text-2xl"
                    onChange={(e) =>
                      setValue("rateio", formatCurrency(e.target.value))
                    }
                  />
                )}
              />
              {errors.rateio && (
                <p className="text-red-500 text-base mt-1">
                  {errors.rateio.message}
                </p>
              )}
            </div>

            {result !== null && (
              <div className="text-center mt-4 text-base md:text-xl text-gray-900">
                <p>Valor a pagar</p>
                <p className="font-bold">R$ {result}</p>
              </div>
            )}

            <Button
              type="button"
              onClick={handleReset}
              className="w-full text-base md:text-lg bg-gray-400 hover:bg-gray-500"
            >
              Limpar
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}