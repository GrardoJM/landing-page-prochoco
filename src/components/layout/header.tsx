
'use client';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/layout/contact-modal';
import { useState } from 'react';
import { SealsAlertDialog } from './seals-alert-dialog';
import { GoalVisionModal } from './goal-vision-modal';
import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';
import { CheckoutModal } from './checkout-modal';

export default function Header() {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isSealsAlertOpen, setSealsAlertOpen] = useState(false);
  const [isGoalVisionModalOpen, setGoalVisionModalOpen] = useState(false);
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);
  const { cartItems } = useCart();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => scrollTo('recipes')}>Recetas</Button>
            <Button variant="ghost" onClick={() => scrollTo('stores')}>Tiendas</Button>
            <Button variant="ghost" onClick={() => setGoalVisionModalOpen(true)}>Nuestra Vision</Button>
            <Button variant="ghost" onClick={() => setSealsAlertOpen(true)}>Cuidados</Button>
            <Button variant="ghost" onClick={() => setContactModalOpen(true)}>Contactanos</Button>
          </nav>
          <Button onClick={() => setCheckoutModalOpen(true)} variant="outline" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalQuantity}
              </span>
            )}
            <span className="sr-only">Open cart</span>
          </Button>
        </div>
      </header>
      <ContactModal isOpen={isContactModalOpen} onOpenChange={setContactModalOpen} />
      <SealsAlertDialog isOpen={isSealsAlertOpen} onOpenChange={setSealsAlertOpen} />
      <GoalVisionModal isOpen={isGoalVisionModalOpen} onOpenChange={setGoalVisionModalOpen} />
      <CheckoutModal isOpen={isCheckoutModalOpen} onOpenChange={setCheckoutModalOpen} />
    </>
  );
}
