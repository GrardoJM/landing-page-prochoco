import { Logo } from '@/components/ui/logo';
import { Twitter, Instagram, Facebook } from 'lucide-react';

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
          <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" /></a>
          <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" /></a>
          <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" /></a>
        </div>
      </div>
    </footer>
  );
}
