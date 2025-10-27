
'use client';
import ChocolateBar3D from '@/components/ui/chocolate-bar-3d';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 md:py-24">
      <div className="flex flex-col items-start gap-6">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
          Indulgence, Redefined.
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Experience the exquisite taste of ProChoco, where premium cacao beans meet artisanal craftsmanship. Pure bliss in every bite.
        </p>
        <Button size="lg" onClick={() => scrollTo('product-showcase')}>
          Explore Flavors <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <ChocolateBar3D />
      </div>
    </section>
  );
}
