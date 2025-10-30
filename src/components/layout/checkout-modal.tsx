'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function CheckoutModal({ isOpen, onOpenChange }: CheckoutModalProps) {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');

  const handleConfirmPurchase = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');

    const orderDetails = {
      name,
      email,
      address,
      items: cartItems,
      total: cartItems.reduce((total, item) => total + item.quantity * 1, 0), // Assuming price is 1 for now
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        setStatus('success');
        toast({
          title: "¡Pedido Recibido!",
          description: "Hemos recibido tu pedido. ¡Tu chocolate está en camino!",
        });
        clearCart();
        onOpenChange(false);
      } else {
        setStatus('error');
        toast({ title: "Error", description: "Hubo un problema al procesar tu pedido." });
      }
    } catch (error) {
      setStatus('error');
      toast({ title: "Error", description: "Hubo un problema con la conexión." });
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartShopping = () => {
    onOpenChange(false);
    setTimeout(() => {
      scrollTo('product-showcase');
    }, 100);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Tu carrito de compras</DialogTitle>
          <DialogDescription>
            Revise sus artículos y complete su pedido.
          </DialogDescription>
        </DialogHeader>
        {cartItems.length > 0 ? (
          <>
            <div className="max-h-[250px] overflow-y-auto pr-4 my-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.imageUrl} alt={item.description} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold capitalize">{item.id.replace(/-/g, ' ')}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <Input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        min="0"
                        className="w-16 h-8"
                      />
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <form className="grid gap-4" onSubmit={handleConfirmPurchase}>
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Tu nombre" required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo Electronico</Label>
                        <Input id="email" type="email" placeholder="tuc@correo.com" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="payment">Método de pago</Label>
                        <Select required defaultValue="credit-card">
                        <SelectTrigger id="payment">
                            <SelectValue placeholder="Selecciona un método de pago" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="credit-card">Tarjeta de Crédito</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="choco-coin">ChocoCoin</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Dirección de envío</Label>
                    <Textarea id="address" placeholder="Grand Line 123" required value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <DialogFooter className="mt-4">
                    <p className="text-muted-foreground mr-auto">Total de artículos: {totalItems}</p>
                    <Button type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Procesando...' : 'Comprar Ahora'}
                    </Button>
                </DialogFooter>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Tu carrito de compras esta vacío.</p>
            <Button className="mt-4" onClick={handleStartShopping}>Empieza a comprar</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
