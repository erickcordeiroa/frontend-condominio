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
import ImgBackground from "@/assets/images/background-calculator.png";
import painelVisual from "@/assets/images/painel-visual.png";

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
      .min(1, "O número do imóvel é obrigatório.")
      .refine(
        (val) => fraction.some((f) => f.location === val.padStart(2, "0")),
        "Digite o número de um imóvel válido!"
      ),
    rateio: z.string().min(1, "Informe um valor válido."),
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

      const formattedData = data.map((item: any) => ({
        ...item,
        fraction: parseFloat(item.fraction),
      }));
      setFractions(formattedData);

      console.log(formattedData)

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

    const valueToPay = (rateioFormatted * findFraction.fraction);
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
        <div className="w-full mt-12 mb-14 px-4">
          <img
            src={painelVisual}
            alt="Imagem logo"
            className="w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.1)] rounded-md"
            onLoad={(e) =>
              (e.target as HTMLImageElement).classList.remove("opacity-0")
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row justity-center gap-4 sm:gap-6 lg:gap-12 mt-10 px-4 max-w-4xl">
          <Button
            className="w-full sm:w-auto text-sm sm:text-base md:text-2xl bg-[#1111cf] text-white hover:bg-[#115dcf] px-4 py-3 md:px-4 md:py-6"
            type="button"
            onClick={() => navigate("/properties/rent")}
          >
            ALUGUE
          </Button>
          <Button
            className="w-full sm:w-auto text-sm sm:text-base md:text-2xl bg-[#37a23a] text-white hover:bg-[#49c245] px-4 py-3 md:px-4 md:py-6"
            type="button"
            onClick={() => navigate("/properties/sale")}
          >
            COMPRE
          </Button>
          <Button
            onClick={scrollToForm}
            className="w-full sm:w-auto text-sm sm:text-base md:text-2xl px-4 py-3 md:px-4 md:py-6 bg-[#12368f] text-white hover:bg-[#0047cc]"
            type="button"
          >
            SIMULE SEU CONDOMINIO
          </Button>
        </div>
      </section>

      <section
        ref={formSectionRef}
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${ImgBackground})` }}
      >
        <div className="absolute inset-0 bg-white opacity-70"></div>

        <div className="relative bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-lg w-full max-w-2xl mx-4">
          <h2 className="text-center text-lg sm:text-xl lg:text-3xl font-bold text-[#09273c] mb-4 sm:mb-6 md:mb-10">
            Descubra o Valor do Seu Condomínio de Forma Simples e Rápida!
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-2 text-center">
            Agora você pode calcular o valor exato de cada item do seu
            condomínio!
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-2 text-center">
            Basta inserir o valor desejado e o número da sua unidade para ver
            automaticamente o custo de cada item do seu condomínio.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-8 text-center">
            Transparência e controle na ponta dos seus dedos.
          </p>

          <form
            onSubmit={handleSubmit(handleCalculate)}
            className="space-y-6 sm:space-y-8 md:space-y-10"
          >
            <div>
              <Label className="text-sm sm:text-base md:text-2xl font-medium text-gray-700">
                Selecione o tipo do imóvel:
              </Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue("location", "");
                  }}
                    defaultValue={field.value}
                    className="mt-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:space-x-6 gap-3 sm:gap-0">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="LOJA" id="LOJA" />
                        <Label
                          htmlFor="LOJA"
                          className="text-sm sm:text-base md:text-xl mb-0"
                        >
                          Loja
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="APTO" id="APTO" />
                        <Label
                          htmlFor="APTO"
                          className="text-sm sm:text-base md:text-xl mb-0"
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
                className="text-sm sm:text-base md:text-2xl font-medium text-gray-700"
              >
                Digite o número do seu apartamento ou loja:
              </Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-2 px-4 py-6 text-base sm:text-lg md:text-xl"
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
                className="text-sm sm:text-base md:text-2xl font-medium text-gray-700"
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
                    className="mt-2 px-4 py-6 text-base sm:text-lg md:text-xl"
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
              <div className="text-center mt-4 text-base sm:text-lg md:text-2xl text-gray-900">
                <p>Valor a pagar</p>
                <p className="font-bold">R$ {result}</p>
              </div>
            )}

            <Button
              type="button"
              onClick={handleReset}
              className="w-full py-6 text-base sm:text-lg md:text-2xl bg-gray-400 hover:bg-gray-500"
            >
              Limpar
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
