import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const images = [
  "https://fastly.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI",
  "https://fastly.picsum.photos/id/49/1280/792.jpg?hmac=NnUJy0O9-pXHLmY2loqVs2pJmgw9xzuixgYOk4ALCXU",
  "https://fastly.picsum.photos/id/55/4608/3072.jpg?hmac=ahGhylwdN52ULB37deeMZX6T_G7NiERtoPhwydMvUKQ",
];

export default function Home() {
  const [type, setType] = useState("loja");
  const [number, setNumber] = useState("");
  const [rateio, setRateio] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (!number || !rateio) return;
    const value = parseFloat(rateio) * (type === "loja" ? 1.2 : 1.0);
    setResult(value);
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Carrossel */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden relative rounded-2xl">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="w-full h-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition backdrop-blur-sm border-none" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition backdrop-blur-sm border-none" />
        </Carousel>
      </div>

      {/* Formulário de Cálculo */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl p-4 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg">
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-blue-900 mb-4 sm:mb-6">
          Cálculo de Rateio
        </h2>
        <div className="space-y-4 sm:space-y-6">
          {/* Radio Buttons para seleção do tipo */}
          <div>
            <Label className="text-sm font-medium text-blue-800">Selecione o tipo:</Label>
            <RadioGroup
              defaultValue="loja"
              className="mt-2"
              onValueChange={(value) => setType(value)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="loja" id="loja" className="text-blue-600" />
                  <Label htmlFor="loja" className="text-sm text-blue-800">
                    Loja
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="apartamento" id="apartamento" className="text-blue-600" />
                  <Label htmlFor="apartamento" className="text-sm text-blue-800">
                    Apartamento
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Número da Loja/Apartamento */}
          <div>
            <Label htmlFor="number" className="text-sm font-medium text-blue-800">
              Número da Loja/Apartamento:
            </Label>
            <Input
              id="number"
              type="number"
              placeholder="Ex: 101"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mt-2 rounded-[5px] bg-white/80 border-blue-200 focus:border-blue-400"
            />
          </div>

          {/* Valor do Rateio */}
          <div>
            <Label htmlFor="rateio" className="text-sm font-medium text-blue-800">
              Valor do Rateio (R$):
            </Label>
            <Input
              id="rateio"
              type="number"
              placeholder="Ex: 150.00"
              value={rateio}
              onChange={(e) => setRateio(e.target.value)}
              className="mt-2 rounded-[5px] bg-white/80 border-blue-200 focus:border-blue-400"
            />
          </div>

          {/* Botão de Calcular */}
          <Button
            onClick={calculate}
            className="w-full rounded-[5px] bg-blue-600 hover:bg-blue-700 transition text-white py-2 shadow-md"
          >
            Calcular
          </Button>

          {/* Resultado */}
          {result !== null && (
            <div className="text-center mt-4">
              <p className="text-lg font-bold text-blue-900">
                Valor a pagar: R$ {result.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}