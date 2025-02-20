import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { CameraOffIcon, ChevronRight } from "lucide-react";
import { useApi } from "@/service/apiService";
import { IProperty } from "@/types/Property";
import useSpinner from "@/hooks/useLoadingStore";
import { Pagination } from "@/components/Pagination";

const API_URL = import.meta.env.VITE_API_URL_BACKEND;

function PropertyList() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const { loading, setLoading, Spinner } = useSpinner();
  const [sortOption, setSortOption] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const api = useApi();
  const propertiesPerPage = 6;
  const navigate = useNavigate();

  const getList = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/properties");

      let newData = data.map((item: IProperty) => ({
        ...item,
        type: item.type === "SALE" ? "Venda" : "Locação",
        priceFormatted: (typeof item.price === "string"
          ? parseFloat(item.price)
          : item.price
        ).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      }));

      setProperties(newData);
    } catch (error) {
      console.error("Erro ao listar propriedades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter((property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === "price_asc") {
      filtered.sort((a: any, b: any) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      filtered.sort((a: any, b: any) => b.price - a.price);
    }

    return filtered;
  }, [properties, searchQuery, sortOption]);

  const paginatedProperties = useMemo(() => {
    const indexOfLast = currentPage * propertiesPerPage;
    const indexOfFirst = indexOfLast - propertiesPerPage;
    return filteredAndSortedProperties.slice(indexOfFirst, indexOfLast);
  }, [filteredAndSortedProperties, currentPage]);

  const totalPages = Math.ceil(
    filteredAndSortedProperties.length / propertiesPerPage
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Breadcrumb className="mb-8 flex items-center gap-2 text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="font-semibold">
                Listagem
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <h1 className="text-xl md:text-2xl font-bold">
              Todas as propriedades disponíveis
            </h1>
            <div className="flex flex-col md:flex-row mt-2 md:mt-0 gap-4">
              <Input
                placeholder="Buscar propriedade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-slate-100"
              />
              <Select onValueChange={setSortOption}>
                <SelectTrigger className="bg-slate-100 w-[256px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Padrão</SelectItem>
                  <SelectItem value="price_asc">Menor preço</SelectItem>
                  <SelectItem value="price_desc">Maior preço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-56 w-full rounded-lg" />
                ))
            ) : paginatedProperties.length > 0 ? (
              paginatedProperties.map((property: IProperty) => (
                <Card
                  key={property.id}
                  className="cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <CardHeader>
                    <CardTitle>{property.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {property.photos[0].url ? (
                      <img
                        src={
                          property.photos[0].url
                            ? API_URL + property.photos[0].url
                            : "/default-image.jpg"
                        }
                        alt={property.title}
                        className="w-full h-60 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-60 rounded bg-slate-200 flex items-center justify-center">
                        <CameraOffIcon width={50} height={40} />
                      </div>
                    )}

                    <p className="mt-2 text-lg font-semibold">
                      {property.priceFormatted}
                    </p>
                    <Button className="mt-3 w-full">Ver detalhes</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                Nenhuma propriedade encontrada.
              </p>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default PropertyList;
