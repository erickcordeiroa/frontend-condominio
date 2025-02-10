import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

function PropertyList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Apartamento Luxo", price: 299.99, image: "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg" },
        { id: 2, name: "Casa Moderna", price: 149.99, image: "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg" },
        { id: 3, name: "Cobertura Vista Mar", price: 579.99, image: "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg" },
        { id: 4, name: "Apartamento Compacto", price: 99.99, image: "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg" },
        { id: 5, name: "Mansão Alto Padrão", price: 899.99, image: "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg" },
        { id: 6, name: "Loft Urbano", price: 219.99, image: "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg" },
        { id: 7, name: "Casa de Praia", price: 399.99, image: "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg" },
        { id: 8, name: "Apartamento Duplex", price: 179.99, image: "https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg" },
      ]);
      setLoading(false);
    }, 1500); // Simulando requisição
  }, []);

  // Filtro de pesquisa
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ordenação dos produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price_asc") return a.price - b.price;
    if (sortOption === "price_desc") return b.price - a.price;
    return 0;
  });

  // Paginação
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-8 flex items-center gap-2 text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Início</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="font-semibold">Listagem</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Título e Pesquisa */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <h1 className="text-2xl font-bold">Todas as propriedades disponíveis</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Buscar propriedade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 bg-slate-100"
          />
          <Select onValueChange={setSortOption}>
            <SelectTrigger className="w-52 bg-slate-100">
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

      {/* Listagem de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-56 w-full rounded-lg" />
              ))
          : currentProducts.length > 0
          ? currentProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
                onClick={() => navigate(`/property/${product.id}`)}
              >
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-fill rounded-lg"
                  />
                  <p className="mt-2 text-lg font-semibold">R$ {product.price.toFixed(2)}</p>
                  <Button className="mt-3 w-full">Ver detalhes</Button>
                </CardContent>
              </Card>
            ))
          : <p className="text-gray-500 col-span-full text-center">Nenhuma propriedade encontrada.</p>
        }
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-6">
        {totalPages > 1 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próximo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyList;
