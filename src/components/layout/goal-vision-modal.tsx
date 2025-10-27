
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface GoalVisionModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function GoalVisionModal({ isOpen, onOpenChange }: GoalVisionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center items-center">
          <DialogTitle className="font-headline text-2xl">Our Goal</DialogTitle>
          <DialogDescription className="text-lg pt-2">
            To craft the most exquisite and memorable chocolate experiences in the world.
          </DialogDescription>
        </DialogHeader>
        <div className="text-center pt-4">
          <h3 className="font-headline text-2xl">Our Vision</h3>
          <p className="text-muted-foreground text-lg pt-2">
            To be a globally recognized symbol of artisanal quality and sustainable indulgence.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
