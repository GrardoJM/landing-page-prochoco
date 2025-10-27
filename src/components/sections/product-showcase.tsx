
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';

export default function ProductShowcase() {
  const products = PlaceHolderImages.slice(0, 4);
  const { ref, isInView } = useScrollAnimation();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (product: ImagePlaceholder) => {
    addToCart(product);
    const productName = product.id.replace(/-/g, ' ');
    toast({
      title: "Added to Cart!",
      description: `One ${productName} has been added to your cart.`,
    });
  };

  return (
    <>
      <section id="product-showcase" ref={ref} className={cn("bg-primary/5 py-16 md:py-24 transition-all duration-1000 ease-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Signature Collection</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Crafted with passion, our chocolates are a testament to quality and flavor. Discover your new favorite.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => {
              const productName = product.id.replace(/-/g, ' ');
              return (
                <Card key={product.id} className={cn("overflow-hidden group flex flex-col shadow-sm transition-all hover:shadow-lg", `duration-${300 + index*200}`, isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
                  <CardHeader className="p-0">
                    <div className="overflow-hidden aspect-square">
                       <Image
                          src={product.imageUrl}
                          alt={product.description}
                          width={600}
                          height={600}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={product.imageHint}
                       />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                     <CardTitle className="font-headline text-xl mb-2 capitalize">{productName}</CardTitle>
                     <CardDescription className="flex-grow">{product.description}</CardDescription>
                     <Button className="w-full mt-4" variant="secondary" onClick={() => handleAddToCart(product)}>
                       <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                     </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </>
  );
}
