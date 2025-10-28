
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const recipes = [
  {
    title: "Decadent Chocolate Lava Cake",
    description: "A rich, gooey-centered cake made with our 85% Dark Delight bar. The ultimate indulgence.",
    imageUrl: "https://images.unsplash.com/photo-1586985289936-7605d767554e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBsYXZhJTIwY2FrZXxlbnwwfHx8fDE3MjE4MzY3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "lava cake"
  },
  {
    title: "Sea Salt Chocolate Chip Cookies",
    description: "Elevate a classic cookie with chunks of our Sea Salt Surprise bar for a sweet and salty kick.",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llc3xlbnwwfHx8fDE3MjE4MzY4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "chocolate cookie"
  },
  {
    title: "Hazelnut Chocolate Mousse",
    description: "A light and airy mousse using our Hazelnut Heaven bar, topped with toasted hazelnuts.",
    imageUrl: "https://images.unsplash.com/photo-1606790239334-b9643409345e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtb3Vzc2V8ZW58MHx8fHwxNzIxODM2ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "chocolate mousse"
  }
]

export default function Recipes() {
  const { ref, isInView } = useScrollAnimation();

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
            <Card key={index} className={cn("overflow-hidden group flex flex-col shadow-sm transition-all hover:shadow-lg", `duration-${300 + index*200}`, isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
