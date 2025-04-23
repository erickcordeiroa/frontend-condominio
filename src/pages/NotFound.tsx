import { useNavigate } from "react-router-dom";
import notFoundImage from '@/assets/images/404-error.png'
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen text-center">
      <img
        src={notFoundImage}
        alt="Not Found"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 md:mt-8">
        Parece que você se perdeu.
      </h1>
      <p className="text-base sm:text-lg mt-4 max-w-md">
        Mas não se preocupe, vamos te ajudar a voltar para o caminho certo!
      </p>
      <div className="mt-6 md:mt-8">
        <Button onClick={() => navigate('/')}>Voltar para a home</Button>
      </div>
    </div>
  );
};

export default NotFound;
