// discount-recommendation.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for recommending discounts on ProChoco products.
 *
 * discountRecommendation - A function that returns discount recommendation.
 * DiscountRecommendationInput - The input type for the discountRecommendation function.
 * DiscountRecommendationOutput - The return type for the discountRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiscountRecommendationInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe(
      'A summary of the user browsing history on the ProChoco website, including products viewed, time spent on each page, and any items added to the cart.'
    ),
  cartDetails: z
    .string()
    .describe(
      'Details of the current items in the user cart, including product names, quantities, and total value.'
    ),
  hesitationSignals: z
    .string()
    .describe(
      'Any signals indicating user hesitation, such as abandoning the cart, spending a long time on the checkout page without completing the purchase, or viewing the same product multiple times.'
    ),
});
export type DiscountRecommendationInput = z.infer<
  typeof DiscountRecommendationInputSchema
>;

const DiscountRecommendationOutputSchema = z.object({
  offerDiscount: z
    .boolean()
    .describe(
      'Whether or not a discount should be offered to the user based on their browsing behavior and hesitation signals.'
    ),
  discountPercentage: z
    .number()
    .optional()
    .describe(
      'The percentage of discount to offer the user, only present if offerDiscount is true.'
    ),
  reason: z
    .string()
    .optional()
    .describe(
      'The reason for offering the discount, which can encourage the user to complete the purchase.'
    ),
});
export type DiscountRecommendationOutput = z.infer<
  typeof DiscountRecommendationOutputSchema
>;

export async function discountRecommendation(
  input: DiscountRecommendationInput
): Promise<DiscountRecommendationOutput> {
  return discountRecommendationFlow(input);
}

const discountRecommendationPrompt = ai.definePrompt({
  name: 'discountRecommendationPrompt',
  input: {schema: DiscountRecommendationInputSchema},
  output: {schema: DiscountRecommendationOutputSchema},
  prompt: `
Eres un asistente de IA que ayuda a determinar si se debe ofrecer un descuento a un usuario en el sitio web de ProChoco.

Considera la siguiente información sobre el comportamiento de navegación, detalles del carrito y señales de duda del usuario para decidir si se le debe ofrecer un descuento.

Historial de Navegación: {{{browsingHistory}}}
Detalles del Carrito: {{{cartDetails}}}
Señales de Duda: {{{hesitationSignals}}}

Con base en esta información, determina si se debe ofrecer un descuento al usuario. 
Si se ofrece un descuento, proporciona un porcentaje de descuento y una razón corta que motive al usuario a completar la compra.

Sé breve y proporciona únicamente:
- Si se ofrece el descuento (offerDiscount)
- El porcentaje del descuento (discountPercentage), si aplica
- La razón (reason), si aplica

**La respuesta debe estar en formato JSON y en español.**
  `,
});


const discountRecommendationFlow = ai.defineFlow(
  {
    name: 'discountRecommendationFlow',
    inputSchema: DiscountRecommendationInputSchema,
    outputSchema: DiscountRecommendationOutputSchema,
  },
  async input => {
    const {output} = await discountRecommendationPrompt(input);
    return output!;
  }
);
