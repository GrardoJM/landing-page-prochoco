"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface GoalVisionModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function GoalVisionModal({
  isOpen,
  onOpenChange,
}: GoalVisionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center items-center">
          <DialogTitle className="font-headline text-2xl">
            Nuesta misión
          </DialogTitle>
          <DialogDescription className="text-lg pt-2">
            Ofrecer una opción deliciosa y nutritiva para quienes buscan cuidar
            su cuerpo sin dejar de disfrutar el sabor chocolate, combinando
            energía y proteína en cada bocado
          </DialogDescription>
        </DialogHeader>
        <div className="text-center pt-4">
          <h3 className="font-headline text-2xl">Nuestra visión</h3>
          <p className="text-muted-foreground text-lg pt-2">
            Ser la marca líder en snacks saludables que inspire a las personas a
            mantener un equilibrio entre bienestar y disfrutas a través de
            productos innovadores y accesibles
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
