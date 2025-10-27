
'use client';
import { Leaf, Award, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Finest Ingredients',
    description: 'We source only the highest quality cacao beans from sustainable farms across the globe.',
    delay: 'duration-300'
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Artisanal Quality',
    description: 'Each bar is crafted by master chocolatiers with decades of experience and passion.',
    delay: 'duration-500'
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: 'Elegant Packaging',
    description: 'Our chocolates are presented in beautiful, eco-friendly packaging, perfect for gifting.',
    delay: 'duration-700'
  }
]

export default function About() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} className={cn("container mx-auto py-16 md:py-24 transition-all duration-1000 ease-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">The ProChoco Promise</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          More than just chocolate, it's a commitment to perfection from bean to bar.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className={cn("text-center border-2 bg-transparent border-transparent hover:border-primary/10 hover:shadow-xl transition-all pt-6", feature.delay, isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
            <CardHeader className="p-4">
              <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                {feature.icon}
              </div>
              <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
