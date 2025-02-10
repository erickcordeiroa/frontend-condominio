import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageDrop from "@/components/ImageDrop";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";

interface EditPropertyProps {
  property: {
    id: number;
    title: string;
    description: string;
    owner: string;
    images: string[];
  };
}

export default function EditProperty() {
  const { setBreadcrumbItems } = useOutletContext<{
    setBreadcrumbItems: (items: { label: string; href: string }[]) => void;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    setBreadcrumbItems([
      { label: "Admin", href: "#" },
      { label: "Propriedades", href: "/admin/property/list" },
      { label: "Editar", href: `/admin/property/edit/${id}` },
    ]);
  }, [setBreadcrumbItems, id]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Editar Apartamento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            placeholder="Título do apartamento"
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            placeholder="Descrição do apartamento"
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label>Proprietário</Label>
          <Input placeholder="Nome do proprietário" required className="mt-2" />
        </div>
        <div>
          <Label>Imagens</Label>
          <ImageDrop />
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="default"
            onClick={() => navigate("/admin/property/list")}
          >
            Voltar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
