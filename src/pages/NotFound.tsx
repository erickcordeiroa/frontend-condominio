import { useNavigate } from "react-router-dom";
import notFoundImage from '@/assets/images/404-error.png'
import { Button } from "@/components/ui/button";

const NotFound = () => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src={notFoundImage}
          alt="Not Found"
          className="max-w-md"
        />
        <h1 className="text-4xl font-bold mt-8">Parece que você se perdeu.</h1>
        <p className="text-lg mt-4">
          Mas não se preocupe, vamos te ajudar a voltar para o caminho certo!
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/')}>Voltar para a home</Button>
        </div>
      </div>
    );
}

export default NotFound;