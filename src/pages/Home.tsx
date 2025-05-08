
import { Button } from "@/components/ui/button";
import painelVisual from "@/assets/images/painel-visual.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white gap-12 pb-4">
      <section className="w-full flex flex-col items-center">
        <div className="w-full mt-2 px-2">
          <img
            src={painelVisual}
            alt="Imagem logo"
            className="w-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.1)] rounded-md"
            onLoad={(e) =>
              (e.target as HTMLImageElement).classList.remove("opacity-0")
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row justity-center gap-4 sm:gap-6 lg:gap-12 mt-4 px-4 max-w-4xl">
          <Button
            className="w-full sm:w-auto text-sm sm:text-base md:text-2xl bg-[#1111cf] text-white hover:bg-[#115dcf] px-4 py-3 md:px-4 md:py-6"
            type="button"
            onClick={() => navigate("/properties/rent")}
          >
            ALUGUE
          </Button>
          <Button
            className="w-full sm:w-auto text-sm sm:text-base md:text-2xl bg-[#37a23a] text-white hover:bg-[#49c245] px-4 py-3 md:px-4 md:py-6"
            type="button"
            onClick={() => navigate("/properties/sale")}
          >
            COMPRE
          </Button>
          <Button
            onClick={() => navigate("/simulador")}
            className="w-full sm:w-auto text-sm sm:text-base md:text-1xl bg-white hover:bg-white px-4 py-3 md:px-4 md:py-6 text-[#12368f] hover:border-b border-[#0047cc]"
            type="button"
          >
            SIMULE SEU CONDOMINIO
          </Button>
        </div>
      </section>
    </div>
  );
}
