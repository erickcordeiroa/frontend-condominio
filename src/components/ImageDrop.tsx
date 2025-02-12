import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";

const API_URL = import.meta.env.VITE_API_URL_BACKEND;

interface ImageDropProps {
  control: any;
  name: string;
  defaultImages?: any[];
  onDeleteImage?: (id: string) => void;
}

const ImageDrop: React.FC<ImageDropProps> = ({ control, name, defaultImages = [], onDeleteImage }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: defaultImages || [],
  });


  const images = Array.isArray(field.value)
    ? field.value
    : field.value?.value || [];

    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/*": []
      },
      onDrop: (acceptedFiles) => {
        const updatedFiles = [...images, ...acceptedFiles].slice(0, 5);
        field.onChange(updatedFiles);
      },
    });

  const handleRemoveImage = (index: number): void => {
    const updatedFiles = images.filter((_: any, i: any) => i !== index);
    field.onChange(updatedFiles);
    if (onDeleteImage && images[index]?.id) {
      onDeleteImage(images[index].id);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "1px dashed gray",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Arraste e solte imagens aqui, ou clique para selecionar</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {images.map((file: any, index: any) => {

          const imageUrl =
            file instanceof File
              ? URL.createObjectURL(file) // Novo arquivo do dropzone
              : API_URL + file.url; // Imagem vinda do backend

          return (
            <div key={index} style={{ position: "relative", margin: "5px",  marginRight: '25px' }}>
              <img
                src={imageUrl}
                alt={`Imagem ${index}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: "absolute",
                  top: "0",
                  right: "-15px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                  padding: '0px 8px 8px',
                  height: '26px',
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageDrop;