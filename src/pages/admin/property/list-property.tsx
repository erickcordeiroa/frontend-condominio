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
import { useEffect, useState } from "react";
import { useApi } from "@/service/apiService";
import { IProperty } from "@/types/Property";
import useSpinner from "@/hooks/useLoadingStore";
import { SkeletonList } from "@/components/SkeletonList";
import DeleteConfirmationModal from "@/components/Modal";
import { toast } from "react-toastify";

export default function ListProperty() {
  const { loading, setLoading } = useSpinner();
  const navigate = useNavigate();
  const api = useApi();
  const { setBreadcrumbItems } = useOutletContext<{
    setBreadcrumbItems: (items: { label: string; href: string }[]) => void;
  }>();
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [propertyIdToDelete, setPropertyIdToDelete] = useState<string | null>(null);

  const getList = async () => {
    const { data } = await api.get("/properties");
  
    let newData = data;
  
    if (data.length > 0) {
      newData = data.map((item: IProperty) => {
        const newItem = { ...item };
        newItem.type = newItem.type === "SALE" ? "Venda" : "Locação";
  
        const priceAsNumber = typeof newItem.price === "string" ? parseFloat(newItem.price) : newItem.price;
  
        newItem.priceFormatted = priceAsNumber.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
  
        return newItem;
      });
    }
  
    setProperties(newData);
  };

  const handleDeleteProperty = async () => {
    if (!propertyIdToDelete) return;

    try {
      setLoading(true);
      setOpen(false);
      await api.delete(`/property/${propertyIdToDelete}/photos`);
      await api.delete(`/property/${propertyIdToDelete}`);
      await getList();

      toast.success('Propriedade excluída com sucesso.')
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
                <TableHead>Localização</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((item) => (
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