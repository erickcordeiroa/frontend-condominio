import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, PlusCircleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useApi } from "@/service/apiService";
import { IProperty } from "@/types/Property";
import useSpinner from "@/hooks/useLoadingStore";
import { SkeletonList } from "@/components/SkeletonList";
import DeleteConfirmationModal from "@/components/Modal";
import { toast } from "react-toastify";
import { Pagination } from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function ListProperty() {
  const { loading, setLoading } = useSpinner();
  const navigate = useNavigate();
  const api = useApi();
  const { setBreadcrumbItems } = useOutletContext<{
    setBreadcrumbItems: (items: { label: string; href: string }[]) => void;
  }>();
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [propertyIdToDelete, setPropertyIdToDelete] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const getList = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/properties");

      let newData = data;

      if (data.length > 0) {
        newData = data.map((item: IProperty) => {
          const newItem = { ...item };
          newItem.type = newItem.type === "SALE" ? "Venda" : "Locação";

          const priceAsNumber =
            typeof newItem.price === "string"
              ? parseFloat(newItem.price)
              : newItem.price;

          newItem.priceFormatted = priceAsNumber.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          return newItem;
        });
      }

      setProperties(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async () => {
    if (!propertyIdToDelete) return;

    try {
      setLoading(true);
      setOpen(false);
      await api.delete(`/property/${propertyIdToDelete}/photos`);
      await api.delete(`/property/${propertyIdToDelete}`);
      await getList();

      toast.success("Propriedade excluída com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar propriedade:", error);
    } finally {
      setLoading(false);
      setPropertyIdToDelete(null);
    }
  };

  const openDeleteModal = (id: string) => {
    setPropertyIdToDelete(id);
    setOpen(true);
  };

  // Calcula o total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(properties.length / ITEMS_PER_PAGE);
  }, [properties]);

  // Filtra as propriedades para a página atual
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return properties.slice(startIndex, endIndex);
  }, [properties, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      setBreadcrumbItems([
        { label: "Admin", href: "#" },
        { label: "Propriedades", href: "/admin/properties" },
        { label: "Listar", href: "/admin/properties" },
      ]);
      await getList();
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <SkeletonList />
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Listagem de Propriedades</h2>
            <Button onClick={() => navigate("/admin/property/create")}>
              <PlusCircleIcon className="w-4 h-4 mr-2" /> Cadastrar novo
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Título</TableHead>
                <TableHead>Número do imóvel</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProperties.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.priceFormatted}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="flex flex-row justify-center gap-3">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() =>
                        navigate(`/admin/property/edit/${item.id}`)
                      }
                    >
                      <Pencil className="w-4 h-4" /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="default"
                      onClick={() => openDeleteModal(item.id.toString())}
                    >
                      <Trash className="w-4 h-4" /> Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <DeleteConfirmationModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={handleDeleteProperty}
            sentence={"Confirma a exclusão desta propriedade?"}
          />
        </>
      )}
    </div>
  );
}
