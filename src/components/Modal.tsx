import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CircleAlertIcon } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sentence: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  sentence,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="py-8">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-3">
              {" "}
              <CircleAlertIcon />
              <p>Atenção</p>{" "}
            </div>
          </DialogTitle>
        </DialogHeader>
        <span>{sentence}</span>
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
