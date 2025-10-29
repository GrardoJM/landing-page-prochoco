"use client";

import { useState, useCallback, useTransition } from 'react';
import { useOnExitIntent } from '@/hooks/use-on-exit-intent';
import { getDiscountRecommendation } from '@/app/actions';
import type { DiscountRecommendationOutput } from '@/ai/flows/discount-recommendation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, PartyPopper } from 'lucide-react';
import { ClaimDiscountModal } from '@/components/layout/claim-discount-modal';

export default function DiscountModalProvider({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [recommendation, setRecommendation] = useState<DiscountRecommendationOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const [hasTriggered, setHasTriggered] = useState(false);

  const triggerDiscountCheck = useCallback(() => {
    if (hasTriggered || isPending) return;

    setHasTriggered(true);

    startTransition(async () => {
      const input = {
        browsingHistory: 'User has been browsing the landing page for over 10 seconds.',
        cartDetails: 'User has no items in the cart.',
        hesitationSignals: 'User has shown exit intent by moving the mouse out of the viewport.',
      };
      const result = await getDiscountRecommendation(input);
      
      if (result.offerDiscount) {
        setRecommendation(result);
        setIsDialogOpen(true);
      }
    });
  }, [hasTriggered, isPending]);

  useOnExitIntent(triggerDiscountCheck);

  const handleClaimDiscountClick = () => {
    setIsDialogOpen(false);
    setIsClaimModalOpen(true);
  }

  return (
    <>
      {children}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="bg-accent/20 rounded-full p-3 mb-4 w-fit">
              <PartyPopper className="h-8 w-8 text-accent" />
            </div>
            <DialogTitle className="font-headline text-2xl">Una especial oferta para ti!</DialogTitle>
            <DialogDescription className="text-base min-h-[24px]">
              {isPending ? <Loader2 className="animate-spin h-6 w-6 mx-auto" /> : recommendation?.reason}
            </DialogDescription>
          </DialogHeader>
          {recommendation?.offerDiscount && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">Aquí tienes un descuento de</p>
              <p className="font-headline text-6xl font-bold text-primary my-2">
                {recommendation.discountPercentage}% OFF
              </p>
              <p className="text-sm text-muted-foreground">para tu próxima compra.</p>
            </div>
          )}
          <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleClaimDiscountClick}>
           Reclama tu descuento y compre ahora
          </Button>
        </DialogContent>
      </Dialog>
      <ClaimDiscountModal isOpen={isClaimModalOpen} onOpenChange={setIsClaimModalOpen} discountPercentage={recommendation?.discountPercentage} />
    </>
  );
}
