
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const stores = [
  {
    name: 'Amazon Mx',
    location: '123 Britannia, Flavor Town',
    delay: 'duration-300',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    name: 'Mercado Libre',
    location: '456 Vinland, Cacao City',
    delay: 'duration-500',
    url: 'https://www.youtube.com/watch?v=o-YBDTqX_ZU'
  },
  {
    name: 'Smart Fit',
    location: '789 Shibuya, Organic Oasis',
    delay: 'duration-700',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4'
  },
  {
    name: 'Oxxos',
    location: '123 Grand Line, Flavor Town',
    delay: 'duration-700',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4'
  },
  {
    name: 'Walmarts',
    location: '456  Konoha, Cacao City',
    delay: 'duration-700',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4'
  },
  {
    name: 'Proximamente en tu tienda favorita',
    location: '',
    delay: 'duration-700',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4'
  },
];

export default function Stores() {
  const { ref, isInView } = useScrollAnimation();
  return (
    <section id="stores" ref={ref} className={cn("container mx-auto py-16 md:py-24 transition-all duration-1000 ease-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Encuentranos en nuestras tiendas</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Nuestros chocolates están disponibles en estas tiendas.        
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stores.map((store, index) => (
            <a key={index} href={store.url} target="_blank" rel="noopener noreferrer" className="block">
                <Card className={cn("text-center border-2 bg-transparent border-transparent hover:border-primary/10 hover:shadow-xl transition-all pt-6 h-full", store.delay, isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
                    <CardHeader className="p-4">
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                        <Store className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">{store.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">{store.location}</p>
                    </CardContent>
                </Card>
            </a>
        ))}
      </div>
    </section>
  );
}
