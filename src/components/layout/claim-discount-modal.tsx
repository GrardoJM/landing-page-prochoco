
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

interface ClaimDiscountModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  discountPercentage?: number;
}

export function ClaimDiscountModal({ isOpen, onOpenChange, discountPercentage }: ClaimDiscountModalProps) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            toast({
                title: "Discount Claimed!",
                description: `Your ${discountPercentage}% discount code will be sent to ${email} within 24 hours.`,
            });
            setTimeout(() => {
                onOpenChange(false);
                setIsSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };
    
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleContinueShopping = () => {
        onOpenChange(false);
        setTimeout(() => {
            scrollTo('product-showcase');
        }, 100);
    }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {!isSubmitted ? (
            <>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Claim Your Discount</DialogTitle>
                    <DialogDescription>
                        Enter your email to receive your {discountPercentage}% discount code. We'll send it to you within 24 hours.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="sr-only">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="your.email@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full mt-2">Claim My {discountPercentage}% Off</Button>
                </form>
            </>
        ) : (
            <div className="text-center py-8 flex flex-col items-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="font-headline text-2xl mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">Your discount code is on its way to your inbox.</p>
                <Button onClick={handleContinueShopping}>Continue Shopping</Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
