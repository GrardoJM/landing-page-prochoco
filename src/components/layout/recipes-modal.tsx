"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

interface RecipesModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  type: string;
}

const recipes = [
  {
    title: "Barra de Proteína de Chocolate y Avena 🍫",
    description:
      "Una mezcla deliciosa de avena integral y cacao puro, ideal para recuperar energía después del entrenamiento. Rica en fibra, con una textura cremosa y el balance perfecto entre dulzura y potencia.",
    ingredients: [
      "2 cucharadas de cacao 85%",
      "1 scoop de proteína de vainilla",
      "1 cda de miel natural o jarabe de agave",
      "½ taza de avena molida",
      "1 pizca de canela (opcional)",
    ],
    steps: [
      "En un bowl mezcla el cacao, la proteína y la avena.",
      "Agrega la miel y una o dos cucharadas de agua tibia para unir la mezcla.",
      "Revuelve hasta formar una masa uniforme (ni muy seca ni muy pegajosa).",
      "Coloca la mezcla en un molde rectangular y presiona firmemente.",
      "Refrigera durante 1 hora y corta en barras.",
    ],
    tip: "✨ Puedes cubrirlas con un poco de chocolate derretido sin azúcar para un toque más intenso.",
    imageUrl: "/avena.png",
    type: "chocolate",
  },
  {
    title: "Barra Energética de Cacahuate y Miel 🥜",
    description:
      "Perfecta para los días activos. Su combinación de proteína vegetal, miel y cacahuate tostado la hace una bomba natural de energía. Crujiente, dulce y 100% satisfactoria.",
    ingredients: [
      "2 cdas de crema de cacahuate natural (sin azúcar añadida)",
      "1 scoop de proteína vegetal o de suero",
      "1 cda de miel o dátiles triturados",
      "½ taza de avena tostada",
      "1 pizca de sal marina",
    ],
    steps: [
      "Tuesta ligeramente la avena en sartén hasta que tome color dorado.",
      "En un recipiente, mezcla la crema de cacahuate con la miel.",
      "Agrega la proteína y la avena, mezcla bien hasta integrar.",
      "Extiende la masa en un molde y presiona con una cuchara.",
      "Refrigera por 30 minutos antes de cortar.",
    ],
    tip: "🔥 Si te gusta más crujiente, agrégale trocitos de cacahuate o almendra tostada.",
    imageUrl: "/miel.png",
    type: "miel",
  },
  {
    title: "Barra Proteica de Fresa y Yogur 🍓",
    description:
      "Fresca, ligera y con un toque ácido del yogur griego. Ideal para después de entrenar o como snack entre comidas. El sabor de la fresa natural le da un twist veraniego irresistible.",
    ingredients: [
      "½ taza de yogur griego natural (sin azúcar)",
      "1 scoop de proteína sabor fresa o vainilla",
      "2 cdas de avena molida o harina de almendra",
      "5 fresas maduras trituradas",
      "1 cda de miel o eritritol",
    ],
    steps: [
      "En un bowl, mezcla el yogur con la proteína y las fresas trituradas.",
      "Agrega la avena y la miel, y mezcla hasta que quede una masa densa.",
      "Coloca en moldes pequeños y refrigera 1 hora.",
      "Sirve frío, tipo postre proteico.",
    ],
    tip: "🍧 También puedes congelarlas y disfrutarlas tipo helado proteico.",
    imageUrl: "/fresa.png",
    type: "yogur",
  },
  {
    title: "Barra de Chocolate Negro con Almendras 🍫🌰",
    description:
      "El clásico sabor intenso del cacao con la textura crujiente de las almendras. Ideal para los que buscan un snack sofisticado, antioxidante y saciante.",
    ingredients: [
      "2 cdas de cacao puro sin azúcar",
      "1 scoop de proteína sabor chocolate",
      "1 cda de miel o dátiles triturados",
      "¼ taza de almendras picadas",
      "½ taza de avena fina o quinoa inflada",
    ],
    steps: [
      "Tuesta las almendras por 5 minutos en sartén o horno.",
      "Mezcla en un bowl el cacao, la proteína y la avena.",
      "Agrega la miel y un chorrito de agua para unir.",
      "Incorpora las almendras y forma las barras.",
      "Enfría por 1 hora antes de disfrutar.",
    ],
    tip: "🍫 Derrite un poco de chocolate amargo encima para un acabado tipo 'gourmet'.",
    imageUrl: "/almentra.png",
    type: "almond",
  },
  {
    title: "Barra Vegana de Coco y Chía 🥥",
    description:
      "Una barra tropical, ligera y con mucha fibra. Sin productos animales, ideal para una dieta vegana o para quienes buscan energía natural sin procesados.",
    ingredients: [
      "¼ taza de coco rallado",
      "1 scoop de proteína vegetal sabor vainilla",
      "1 cda de semillas de chía",
      "2 cdas de miel de agave o dátiles molidos",
      "1 cda de aceite de coco derretido",
    ],
    steps: [
      "Mezcla todos los ingredientes en un recipiente grande.",
      "Agrega un chorrito de agua si la mezcla queda muy seca.",
      "Forma las barras y colócalas en papel encerado.",
      "Refrigera por 1 hora hasta que endurezcan.",
      "Disfruta frías o a temperatura ambiente.",
    ],
    tip: "🌴 Guarda en refrigeración hasta por 5 días. Perfectas para llevar al gym o la oficina.",
    imageUrl: "/chioa.png",
    type: "coco",
  },
];

export function RecipesModal({ isOpen, onOpenChange, type }: RecipesModalProps) {
  const recipe = recipes.find((r) => r.type === type);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
        {recipe ? (
          <>
            <DialogHeader className="text-center items-center space-y-2">
              <DialogTitle className="font-headline text-3xl">
                {recipe.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                {recipe.description}
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center py-4">
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                width={280}
                height={180}
                className="rounded-xl object-cover shadow-md"
              />
            </div>

            <div className="pt-4 space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-xl mb-2">🥣 Ingredientes</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">👩‍🍳 Preparación</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="pt-3 italic text-center text-lg">
                {recipe.tip}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            Selecciona una receta válida 🙃
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
