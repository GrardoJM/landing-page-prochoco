import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Laura M.',
    review:
      '¡Absolutamente deliciosas! Las barras ProChoco son mi snack favorito después de entrenar. La de chocolate y almendras es increíble.',
    stars: 5,
  },
  {
    name: 'Carlos G.',
    review:
      'Me encantan estas barras. Son perfectas para llevar al trabajo y matar el hambre de media tarde. La de miel y avena es buenísima.',
    stars: 5,
  },
  {
    name: 'Ana P.',
    review:
      '¡Súper recomendadas! El sabor es genial y me ayudan a cumplir mis metas de proteína. La de fresa y yogur es mi perdición.',
    stars: 5,
  },
];

export default function Reviews() {
  return (
    <section className="bg-muted py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-lg bg-background p-6 shadow-lg"
            >
              <div className="mb-4 flex items-center">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary" />
                ))}
              </div>
              <p className="mb-4 text-lg">{review.review}</p>
              <p className="font-bold">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
