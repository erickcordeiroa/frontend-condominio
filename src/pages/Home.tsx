import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100 gap-12">
      {/* Swiper (Carrossel) */}
      <div className="w-full md:w-2/3 h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          className="rounded-3xl h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-3xl" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Formulário de Cálculo */}
      <div className="w-full md:w-1/3 h-[500px] bg-white p-8 rounded-3xl shadow-2xl flex flex-col justify-center">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Cálculo de Rateio</h2>
        <div className="space-y-6">
          {/* Tipo de Rateio */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Selecione o tipo:</Label>
            <RadioGroup defaultValue="loja" className="mt-3" onValueChange={setType}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="loja" id="loja" />
                  <Label htmlFor="loja" className="text-sm">Loja</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="apartamento" id="apartamento" />
                  <Label htmlFor="apartamento" className="text-sm">Apartamento</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Número da Loja/Apartamento */}
          <div>
            <Label htmlFor="number" className="text-sm font-medium text-gray-700">Número:</Label>
            <Input id="number" type="number" placeholder="Ex: 101" value={number} onChange={(e) => setNumber(e.target.value)} className="mt-2" />
          </div>

          {/* Valor do Rateio */}
          <div>
            <Label htmlFor="rateio" className="text-sm font-medium text-gray-700">Valor do Rateio (R$):</Label>
            <Input id="rateio" type="number" placeholder="Ex: 150.00" value={rateio} onChange={(e) => setRateio(e.target.value)} className="mt-2" />
          </div>

          {/* Botão de Calcular */}
          <Button onClick={calculate} className="w-full">Calcular</Button>

          {/* Resultado */}
          {result !== null && (
            <div className="text-center mt-4 text-xl font-bold text-gray-900">
              Valor a pagar: R$ {result.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}