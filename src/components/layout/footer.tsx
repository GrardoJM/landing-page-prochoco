import { Logo } from '@/components/ui/logo';
import { Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} ProChoco. All Rights Reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="https://wa.me/523921052415?text=Hola%20%F0%9F%8D%AB%20Vi%20tus%20chocolates%20y%20me%20gustar%C3%ADa%20hacer%20un%20pedido.%20%C2%BFMe%20puedes%20dar%20informaci%C3%B3n%3F" target="_blank" aria-label="Whatsapp"><Phone className="h-5 w-5 text-muted-foreground hover:text-foreground" /></a>
          <a href="https://www.instagram.com/gera.jm?igsh=dTR2NTZ5cnNha2V5" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" /></a>
        </div>
      </div>
    </footer>
  );
}
