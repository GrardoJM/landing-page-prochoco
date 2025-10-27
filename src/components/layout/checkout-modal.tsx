
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

interface CheckoutModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function CheckoutModal({ isOpen, onOpenChange }: CheckoutModalProps) {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { toast } = useToast();

  const handleConfirmPurchase = (event: React.FormEvent) => {
    event.preventDefault();
    onOpenChange(false);
    clearCart();
    toast({
      title: "Order Received!",
      description: "We've received your order. Your chocolate is on its way!",
    });
  };
  
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartShopping = () => {
    onOpenChange(false);
    // Use a short timeout to ensure the modal is closed before scrolling
    setTimeout(() => {
      scrollTo('product-showcase');
    }, 100);
  };


  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Your Shopping Cart</DialogTitle>
          <DialogDescription>
            Review your items and complete your order.
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
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your Name" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="payment">Payment Method</Label>
                        <Select required defaultValue="credit-card">
                        <SelectTrigger id="payment">
                            <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="choco-coin">ChocoCoin</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Shipping Address</Label>
                    <Textarea id="address" placeholder="123 Chocolate Lane, Sweetville" required />
                </div>
                <DialogFooter className="mt-4">
                    <p className="text-muted-foreground mr-auto">Total Items: {totalItems}</p>
                    <Button type="submit" className="w-full sm:w-auto">Buy Now</Button>
                </DialogFooter>
            </form>
          </>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
            <Button className="mt-4" onClick={handleStartShopping}>Start Shopping</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
