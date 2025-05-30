import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useApi } from "@/service/apiService";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSpinner from "@/hooks/useLoadingStore";
import { toast } from "react-toastify";
import ImageDrop from "@/components/ImageDrop";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const propertySchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  location: z.string().min(1, "O número do imóvel é obrigatório."),
  responsiblePerson: z.string().min(1, "O nome do responsável é obrigatório"),
  contact: z.string().min(1, "O contato é obrigatório"),
  whatsappContact: z.string().optional(),
  type: z.string().min(1, "O tipo é obrigatório"),
  price: z.string().min(1, "O preço é obrigatório"),
  images: z
    .array(z.any())
    .nonempty("Necessário inserir no mínimo uma imagem e no máximo cinco."),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function CreateProperty() {
  const { setLoading } = useSpinner();
  const api = useApi();
  const navigate = useNavigate();

  const { setBreadcrumbItems } = useOutletContext<{
    setBreadcrumbItems: (items: { label: string; href: string }[]) => void;
  }>();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      responsiblePerson: "",
      whatsappContact: "",
      contact: "",
      type: "",
      price: "0",
      images: [],
    },
  });

  const contactValue = watch("contact");
  const priceValue = watch("price");

  const formatPhone = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : value;
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const floatValue = (parseFloat(numericValue) / 100).toFixed(2);

    return floatValue.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const onSubmit = async (items: PropertyFormValues) => {
    try {
      setLoading(true);

      const priceFormatted = parseFloat(
        items.price.replace(/\./g, "").replace(",", ".")
      );

      const { data } = await api.post("/property", {
        title: items.title,
        description: items.description,
        location: items.location,
        responsiblePerson: items.responsiblePerson,
        whatsappContact: items.whatsappContact ?? null,
        contact: items.contact,
        type: items.type,
        price: priceFormatted,
      });

      // Envia novas imagens
      const newImages = items.images.filter((file) => file instanceof File);
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((file) => {
          formData.append("photos", file);
        });

        await api.post(`/property/${data.id}/photos`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigate("/admin/properties");

      toast.success("Nova propriedade adicionada com sucesso.");
    } catch (error) {
      console.error("Erro ao adicionar propriedade ou enviar imagens:", error);
      toast.error("Ocorreu um erro ao adicionar as informações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBreadcrumbItems([
      { label: "Admin", href: "/admin" },
      { label: "Propriedades", href: "/admin/properties" },
      { label: "Criar", href: "/admin/property/create" },
    ]);
  }, [setBreadcrumbItems]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Cadastrar Nova Propriedade</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Título</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Título do imóvel"
                required
                className="mt-2"
              />
            )}
          />
          {errors.title && (
            <span className="text-red-500 text-xs mt-1">
              {errors.title.message}
            </span>
          )}
        </div>
        <div>
          <Label>Descrição</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Descrição do imóvel"
                required
                className="mt-2"
              />
            )}
          />
          {errors.description && (
            <span className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </span>
          )}
        </div>
        <div>
          <Label>Número do imóvel</Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Número do imóvel"
                required
                className="mt-2"
              />
            )}
          />
          {errors.location && (
            <span className="text-red-500 text-xs mt-1">
              {errors.location.message}
            </span>
          )}
        </div>
        <div>
          <Label>Nome do responsável</Label>
          <Controller
            name="responsiblePerson"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nome do responsável"
                required
                className="mt-2"
              />
            )}
          />
          {errors.responsiblePerson && (
            <span className="text-red-500 text-xs mt-1">
              {errors.responsiblePerson.message}
            </span>
          )}
        </div>
        <div>
          <Label>Contato</Label>
          <Controller
            name="contact"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Contato do proprietário"
                required
                className="mt-2"
                value={formatPhone(contactValue)}
                onChange={(e) =>
                  setValue(
                    "contact",
                    formatPhone(e.target.value)
                  )
                }
              />
            )}
          />
          {errors.contact && (
            <span className="text-red-500 text-xs mt-1">
              {errors.contact.message}
            </span>
          )}
        </div>
        <div>
          <Label>Contato WhatsApp</Label>
          <Controller
            name="whatsappContact"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Contato WhatsApp do proprietário"
                className="mt-2"
                value={formatPhone(field.value || "")}
                onChange={(e) =>
                  setValue(
                    "whatsappContact",
                    formatPhone(e.target.value)
                  )
                }
              />
            )}
          />
        </div>
        <div>
          <Label>Tipo</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
                required
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="SALE">Venda</SelectItem>
                    <SelectItem value="RENT">Locação</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <span className="text-red-500 text-xs mt-1">
              {errors.type.message}
            </span>
          )}
        </div>
        <div>
          <Label>Preço</Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Preço do imóvel"
                required
                className="mt-2"
                value={formatCurrency(priceValue)}
                  onChange={(e) =>
                    setValue("price", formatCurrency(e.target.value))
                  }
              />
            )}
          />
          {errors.price && (
            <span className="text-red-500 text-xs mt-1">
              {errors.price.message}
            </span>
          )}
        </div>
        <div>
          <Label>Imagens</Label>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <ImageDrop {...field} control={control} name="images" />
            )}
          />

          {errors.images && (
            <span className="text-red-500 text-xs mt-1">
              {errors.images.message}
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="default"
            onClick={() => navigate("/admin/properties")}
          >
            Voltar
          </Button>
          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </div>
  );
}
