import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageDrop from "@/components/ImageDrop";
import { useOutletContext } from "react-router-dom";

export default function CreateProperty() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const {setBreadcrumbItems} = useOutletContext<{ setBreadcrumbItems: (items: { label: string; href: string }[]) => void }>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5); // Limita a 5 imagens
      setImages(files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, owner, images });
  };

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Admin', href: '/admin' },
      { label: 'Propriedades', href: '/admin/property/list' },
      { label: 'Criar', href: '/admin/property/create' },
    ]);
  }, [setBreadcrumbItems]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Cadastrar Novo Apartamento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Título</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do apartamento"
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição do apartamento"
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label>Proprietário</Label>
          <Input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Nome do proprietário"
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label>Imagens do imóvel</Label>
          <ImageDrop />
        </div>

        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
