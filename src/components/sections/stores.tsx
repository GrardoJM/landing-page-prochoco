
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const stores = [
  {
    name: 'Gourmet Market',
    location: '123 Foodie Lane, Flavor Town',
    delay: 'duration-300',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    name: 'The Chocolate Emporium',
    location: '456 Sweet Street, Cacao City',
    delay: 'duration-500',
    url: 'https://www.youtube.com/watch?v=o-YBDTqX_ZU'
  },
  {
    name: 'Health & Happiness',
    location: '789 Wellness Ave, Organic Oasis',
    delay: 'duration-700',
    url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4'
  },
];

export default function Stores() {
  const { ref, isInView } = useScrollAnimation();
  return (
    <section id="stores" ref={ref} className={cn("container mx-auto py-16 md:py-24 transition-all duration-1000 ease-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">Find Us In Stores</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Our chocolates are available at these fine retailers.
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
