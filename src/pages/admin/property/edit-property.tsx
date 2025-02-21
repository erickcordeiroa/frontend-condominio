import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "@/service/apiService";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageDrop from "@/components/ImageDrop";
import { SkeletonForm } from "@/components/SkeletonForm";
import useSpinner from "@/hooks/useLoadingStore";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "@/components/Modal";

const propertySchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  location: z.string().min(1, "A localização é obrigatória"),
  contact: z.string().min(1, "O contato é obrigatório"),
  type: z.string().min(1, "O tipo é obrigatório"),
  price: z.string().min(1, "O preço é obrigatório"),
  images: z.array(z.any()),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function EditProperty() {
  const { loading, setLoading } = useSpinner();

  const [defaultImages, setDefaultImages] = useState<
    { id: string; url: string }[]
  >([]);
  const [open, setOpen] = useState<boolean>(false);

  const { setBreadcrumbItems } = useOutletContext<{
    setBreadcrumbItems: (items: { label: string; href: string }[]) => void;
  }>();
  const api = useApi();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      contact: "",
      type: "",
      price: "",
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

  // Função para deletar uma imagem específica
  const handleDeleteImage = async (imageId: string) => {
    try {
      await api.delete(`/property/photo/${imageId}`);
      setDefaultImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
    }
  };

  // Função para deletar todas as imagens
  const handleDeleteAllImages = async () => {
    try {
      setLoading(true);
      setOpen(false);
      await api.delete(`/property/${id}/photos`);
      setDefaultImages([]);
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/property/${id}`);

      if (data) {
        const formattedData = {
          ...data,
          type: data.type === "SALE" ? "SALE" : "RENT",
          images: data.photos || [],
          price: formatCurrency(data.price.toString()),
          contact: formatPhone(data.contact),
        };
        setDefaultImages(data.photos || []);

        reset(formattedData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      setLoading(true);

      const priceFormatted = parseFloat(
        data.price.replace(/\./g, "").replace(",", ".")
      );

      await api.put(`/property/${id}`, {
        title: data.title,
        description: data.description,
        location: data.location,
        contact: data.contact,
        type: data.type,
        price: priceFormatted,
      });

      // Exclui imagens marcadas para remoção
      const imagesToDelete = defaultImages.filter(
        (img) =>
          !data.images.some(
            (image) =>
              typeof image === "object" && "id" in image && image.id === img.id
          )
      );
      await Promise.all(
        imagesToDelete.map((img) =>
          api.delete(`/property/${id}/photos/${img.id}`)
        )
      );

      // Envia novas imagens
      const newImages = data.images.filter((file) => file instanceof File);
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((file) => {
          formData.append("photos", file);
        });

        await api.post(`/property/${id}/photos`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setDefaultImages([]);

      navigate("/admin/properties");

      toast.success("Propriedade editada com sucesso.");
    } catch (error) {
      console.error("Erro ao editar propriedade ou enviar imagens:", error);
      toast.error("Ocorreu um erro ao editar as informações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setBreadcrumbItems([
        { label: "Admin", href: "#" },
        { label: "Propriedades", href: "/admin/properties" },
        { label: "Editar", href: `/admin/property/edit/${id}` },
      ]);
      await fetchProperty();
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <SkeletonForm />
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Editar Propriedade</h2>
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
              <Label>Localização</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Localização do imóvel"
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
                      setValue("contact", formatPhone(e.target.value))
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
                  <ImageDrop
                    {...field}
                    control={control}
                    name="images"
                    defaultImages={defaultImages}
                    onDeleteImage={handleDeleteImage}
                  />
                )}
              />
              {errors.images && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.images.message}
                </span>
              )}
              {/*<div>
                <Button
                  disabled={defaultImages.length === 0}
                  variant="destructive"
                  size="sm"
                  onClick={() => setOpen(true)}
                  className="mt-2 mb-4"
                >
                  Excluir todas as imagens
                </Button>
              </div>*/}
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="default"
                type="button"
                onClick={() => navigate("/admin/properties")}
              >
                Voltar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </div>
      )}
      <DeleteConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDeleteAllImages}
        sentence={"Confirma a exclusão desta imagem?"}
      />
    </div>
  );
}
