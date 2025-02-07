import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageDrop from "@/components/ImageDrop";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

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
          <Input
            placeholder="Nome do proprietário"
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label>Imagens</Label>
          <ImageDrop />
        </div>
        <Button type="submit">Salvar Alterações</Button>
      </form>
    </div>
  );
}