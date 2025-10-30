
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { RecipesModal } from '@/components/layout/recipes-modal';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";

const recipes = [
  {
    title: "Barra de Proteína de Chocolate y Avena",
    description: "Una mezcla deliciosa de avena integral y cacao puro, ideal para recuperar energía después del entrenamiento.",
    imageUrl: "/avena.png",
    imageHint: "chocolate oat protein bar",
    type: "chocolate",
    difficulty: "Fácil"
  },
  {
    title: "Barra Energética de Cacahuate y Miel",
    description: "Combinación perfecta entre proteína vegetal, miel natural y trozos de cacahuate tostado. Dulce, crujiente y nutritiva.",
    imageUrl: "/miel.png",
    imageHint: "peanut honey protein bar",
    type: "miel",
    difficulty: "Fácil"
  },
  {
    title: "Barra Proteica de Fresa y Yogur",
    description: "Fresca, suave y con un toque ácido del yogur griego. Perfecta para un snack rápido y saludable.",
    imageUrl: "/fresa.png",
    imageHint: "strawberry yogurt protein bar",
    type: "yogur",
    difficulty: "Intermedio"
  },
  {
    title: "Barra de Proteína de Chocolate Negro con Almendras",
    description: "El sabor intenso del cacao con la crocancia de las almendras. Fuente natural de antioxidantes y energía.",
    imageUrl: "/almentra.png",
    imageHint: "dark chocolate almond protein bar",
    type: "almond",
    difficulty: "Intermedio"
  },
  {
    title: "Barra Vegana de Coco y Chía",
    description: "Ligera, tropical y con alto contenido en fibra. Ideal para quienes buscan energía sin ingredientes animales.",
    imageUrl: "/chioa.png",
    imageHint: "coconut chia vegan bar",
    type: "coco",
    difficulty: "Difícil"
  }
]


interface RecipesModalProps {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  type: string
}

export default function Recipes() {
  const { ref, isInView } = useScrollAnimation();
  const [isRecipesModalOpen, setRecipesModalOpen] = useState(false);
  const [type, setType] = useState("");
  

  const handleRecipesModal = (recipe: RecipesModalProps ) => {
    setRecipesModalOpen(true);
    setType(recipe.type);
  };

  return (
    <section id="recipes" ref={ref} className={cn("bg-primary/5 py-16 md:py-24 transition-all duration-1000 ease-out", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">De nuestra cocina a la tuya</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Descubre deliciosas formas de utilizar ProChoco en tus postres favoritos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <Card onClick={() => handleRecipesModal(recipe)} key={index} className={cn("overflow-hidden group flex flex-col shadow-sm transition-all hover:shadow-lg", `duration-${300 + index*200}`, isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
               <CardHeader className="p-0">
                <div className="overflow-hidden aspect-video">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={recipe.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="font-headline text-xl mb-2">{recipe.title}</CardTitle>
                <p className="text-muted-foreground flex-grow">{recipe.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Badge variant="outline">{recipe.difficulty}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <RecipesModal isOpen={isRecipesModalOpen} onOpenChange={setRecipesModalOpen} type={type} /> 
    </section>
  )
}
