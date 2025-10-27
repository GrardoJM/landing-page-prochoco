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
  prompt: `You are an AI assistant that helps determine whether to offer a discount to a user on the ProChoco website.

  Consider the following information about the user's browsing behavior, cart details, and hesitation signals to determine if a discount should be offered.

  Browsing History: {{{browsingHistory}}}
  Cart Details: {{{cartDetails}}}
  Hesitation Signals: {{{hesitationSignals}}}

  Based on this information, determine whether to offer a discount to the user. If a discount is offered, provide a discount percentage and a reason for offering the discount.
  Be brief, and provide only the discount (if any) and the reason.
  Output in JSON format.
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
