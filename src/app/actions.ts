'use server';

import { 
  discountRecommendation, 
  type DiscountRecommendationInput,
  type DiscountRecommendationOutput
} from '@/ai/flows/discount-recommendation';

export async function getDiscountRecommendation(input: DiscountRecommendationInput): Promise<DiscountRecommendationOutput> {
  try {
    const result = await discountRecommendation(input);
    return result;
  } catch (error) {
    console.error("Error getting discount recommendation:", error);
    return { offerDiscount: false, reason: "An unexpected error occurred." };
  }
}
