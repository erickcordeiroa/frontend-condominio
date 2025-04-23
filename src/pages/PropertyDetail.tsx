import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { IProperty } from "@/types/Property";
import { useApi } from "@/service/apiService";
import useSpinner from "@/hooks/useLoadingStore";

import { ArrowLeftIcon, MessageCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL_BACKEND as string;

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, setLoading, Spinner } = useSpinner();
  const [property, setProperty] = useState<IProperty | null>(null);

  const navigate = useNavigate();
  const api = useApi();

  const getProperty = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/property/${id}`);

      const formattedProperty: IProperty = {
        ...data,
        type: data.type === "SALE" ? "Venda" : "Locação",
        priceFormatted: Number(data.price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        whatsappContact: data.whatsappContact ?? null,
      };

      setProperty(formattedProperty);
    } catch (error) {
      console.error("Erro ao buscar propriedade:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getProperty();
  }, []);


  if (!property) return <p className="p-6">Propriedade não encontrada.</p>;


  return (
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Button
            variant="outline"
            className="mb-4 border-slate-200"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Voltar
          </Button>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              style={{ width: '100%', height: 'auto' }}
            >
              {property.photos.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={API_URL + image.url}
                    alt={`Imagem ${index + 1} da propriedade`}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '5px' }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex flex-col justify-between">
              <CardHeader className="gap-2 md:gap-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {property.title}
                  </CardTitle>

                  <Badge
                    variant="outline"
                    className={
                      property.type.toLowerCase() === "venda"
                        ? "border-green-700 text-green-700"
                        : "border-blue-700 text-blue-700"
                    }
                  >
                    {property.type.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-lg md:text-xl font-semibold text-gray-500">
                  Valor:{" "}
                  <span className="font-bold text-gray-700">
                    {property.priceFormatted}
                  </span>
                </p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="border rounded-lg p-4 bg-slate-50 space-y-1 mb-4">
                  <p className="text-sm md:text-xl">
                    <span className="font-semibold">Responsável: </span>
                    {property.responsiblePerson}
                  </p>
                  <p className="text-sm md:text-xl">
                    <span className="font-semibold">Contato: </span>
                    {property.contact}
                  </p>
                </div>

                {property.whatsappContact && (
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${property.whatsappContact}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle
                        className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform"
                      />
                      <span className="text-green-700 font-medium text-sm md:text-lg">
                        Solicitar informações por WhatsApp
                      </span>
                    </a>
                  </Button>
                )}
              </CardContent>
            </div>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{property.description}</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
