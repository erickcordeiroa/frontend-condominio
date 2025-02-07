import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ImageDrop() {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles].slice(0, 5));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
  });

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 text-center cursor-pointer rounded-md mt-2"
      >
        <input {...getInputProps()} />
        <p>Arraste e solte imagens aqui ou clique para selecionar (máx. 5)</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {images.map((file, index) => {
          const previewUrl = URL.createObjectURL(file);
          return (
            <div key={index} className="relative w-24 h-24">
              <img
                src={previewUrl}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 p-1 rounded-full"
                onClick={() => removeImage(index)}
              >
                <X size={16} />
              </Button>
            </div>
          );
        })}
      </div>

      {images.length > 0 && (
        <Button variant="destructive" onClick={() => setImages([])}>
          Remover Todas
        </Button>
      )}
    </div>
  );
}
