'use client';

import { ShieldCheck, Heart, Leaf, Brain } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Brain size={48} className="text-primary" />,
    title: 'Energía Natural',
    description: 'Nuestras barritas ProChoco te dan un impulso de energía sostenida, ideal para antes de tus entrenamientos o para esos momentos en los que necesitas un extra de concentración. Sin picos de azúcar, solo energía limpia y duradera.',
  },
  {
    icon: <Heart size={48} className="text-primary" />,
    title: 'Recuperación Muscular',
    description: 'Con una alta dosis de proteína de alta calidad, ProChoco es tu aliado perfecto para la recuperación muscular post-entrenamiento. Ayuda a reparar y construir tus músculos de manera efectiva, dejándote listo para tu próximo desafío.',
  },
  {
    icon: <Leaf size={48} className="text-primary" />,
    title: 'Snack Saludable',
    description: '¿Antojo de algo dulce? ProChoco es la opción inteligente. Un snack delicioso y nutritivo que satisface tus ganas de chocolate sin culpas. Hecho con ingredientes naturales, es el bocado perfecto para cualquier momento del día.',
  },
  {
    icon: <ShieldCheck size={48} className="text-primary" />,
    title: 'Calidad Garantizada',
    description: 'En ProChoco, la calidad es nuestra prioridad. Seleccionamos los mejores ingredientes y cuidamos cada detalle del proceso de elaboración para ofrecerte un producto excepcional. ¡Tu confianza es nuestro mayor compromiso!',
  },
];

export default function WhyUs() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} id="why-us" className={cn("py-16 md:py-24 bg-primary/5 transition-all duration-1000 ease-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">¿Por qué elegir ProChoco?</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Descubre los beneficios que nuestras barritas de chocolate proteicas tienen para ti.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex justify-center items-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-headline text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
