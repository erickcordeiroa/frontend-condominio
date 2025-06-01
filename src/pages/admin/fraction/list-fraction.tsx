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
import useSpinner from "@/hooks/useLoadingStore";
import { SkeletonList } from "@/components/SkeletonList";
import DeleteConfirmationModal from "@/components/Modal";
import { toast } from "react-toastify";
import { IFraction } from "@/types/Fraction";
import { Pagination } from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function ListFraction() {
  const { loading, setLoading } = useSpinner();
  const navigate = useNavigate();
  const api = useApi();
  const { setBreadcrumbItems } = useOutletContext<{
    setBreadcrumbItems: (items: { label: string; href: string }[]) => void;
  }>();
  const [fractions, setFractions] = useState<IFraction[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [fractionIdToDelete, setFractionIdToDelete] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const getList = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/fractions");

      let newData = data;

      if (data.length > 0) {
        newData = data.map((item: IFraction) => {
          const newItem = { ...item };
          if (newItem.type === "LOJA") {
            newItem.type = "Loja";
          } else if (newItem.type === "APTO") {
            newItem.type = "Apartamento";
          } else if (newItem.type === "BOX") {
            newItem.type = "Box";
          }

          const fractionAsNumber =
            typeof newItem.fraction === "string"
              ? parseFloat(newItem.fraction)
              : newItem.fraction;

          newItem.fractionFormatted = fractionAsNumber.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          return newItem;
        });
      }

      setFractions(newData);
    } catch (error) {
      console.error("Erro ao buscar as frações:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFraction = async () => {
    if (!fractionIdToDelete) return;

    try {
      setLoading(true);
      setOpen(false);
      await api.delete(`/fraction/delete/${fractionIdToDelete}`);
      await getList();

      toast.success("Fração excluída com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar a fração:", error);
    } finally {
      setLoading(false);
      setFractionIdToDelete(null);
    }
  };

  const openDeleteModal = (id: string) => {
    setFractionIdToDelete(id);
    setOpen(true);
  };

  // Calcula o total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(fractions.length / ITEMS_PER_PAGE);
  }, [fractions]);

  // Filtra as propriedades para a página atual
  const paginatedFractions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return fractions.slice(startIndex, endIndex);
  }, [fractions, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      setBreadcrumbItems([
        { label: "Admin", href: "#" },
        { label: "Frações", href: "/admin/fractions" },
        { label: "Listar", href: "/admin/fractions" },
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
            <h2 className="text-xl font-semibold">Listagem de Frações</h2>
            <Button onClick={() => navigate("/admin/fraction/create")}>
              <PlusCircleIcon className="w-4 h-4 mr-2" /> Cadastrar novo
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número do imóvel</TableHead>
                <TableHead>Fração</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFractions.map((item: IFraction) => (
                <TableRow key={item.id}>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{(item.fraction).toString().replace(".", ",")}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="flex flex-row justify-center gap-3">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() =>
                        navigate(`/admin/fraction/edit/${item.id}`)
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
            onConfirm={handleDeleteFraction}
            sentence={"Confirma a exclusão desta fração?"}
          />
        </>
      )}
    </div>
  );
}
