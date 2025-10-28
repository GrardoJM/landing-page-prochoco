
'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ContactModal({ isOpen, onOpenChange }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Contactanos!</DialogTitle>
          <DialogDescription>
            ¿Tienes alguna pregunta o comentario? Complete el formulario a continuación y nos pondremos en contacto con usted pronto.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" placeholder="Tu nombre" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electronico</Label>
            <Input id="email" type="email" placeholder="tuc@correo.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Cuentanos</Label>
            <Textarea id="message" placeholder="Tu mensaje..." />
          </div>
          <Button type="submit" className="w-full mt-2">Enviar Mensaje</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
