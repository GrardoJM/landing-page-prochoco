
'use client';
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const seals = [
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: 'Libre de sellos de azúcar',
        description: 'Nuestros chocolates están elaborados sin gluten, para que todos puedan disfrutarlos.',
        delay: 'duration-300'
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: 'Proteina Extra',
        description: 'Cada barra está enriquecida con proteínas adicionales para un impulso saludable.',
        delay: 'duration-500'
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: 'A un precio justo',
        description: 'Ofrecemos chocolates de alta calidad a precios accesibles para todos.',
        delay: 'duration-700'
    }
]

export default function Seals() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="seals" ref={ref} className={cn("container mx-auto py-16 md:py-24 transition-all duration-1000 ease-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Nuestros Sellos de Calidad</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Estamos comprometidos a ofrecer chocolate de la más alta calidad y estos sellos son un testimonio de ello.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {seals.map((seal, index) => (
          <Card key={index} className={cn("text-center border-2 bg-transparent border-transparent hover:border-primary/10 hover:shadow-xl transition-all pt-6", seal.delay, isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
            <CardHeader className="p-4">
              <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                {seal.icon}
              </div>
              <CardTitle className="font-headline text-xl">{seal.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground">{seal.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
