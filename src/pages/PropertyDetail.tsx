import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[]; // Agora o produto pode ter várias imagens
}

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulando uma requisição para obter o produto pelo ID
    const fetchedProduct = {
      id: Number(id),
      name: `Produto ${id}`,
      description: `Descrição do Produto ${id}. Este é um produto incrível com várias características que você vai adorar.`,
      price: 199.99,
      images: [
        "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg",
        "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg",
        "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg",
      ],
    };
    setProduct(fetchedProduct);
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Carrossel de Imagens */}
        <div>
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Detalhes do Produto */}
        <div className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full ">
              Solicitar informações
            </Button>
          </CardContent>
        </div>
      </div>

      {/* Descrição do Produto */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
