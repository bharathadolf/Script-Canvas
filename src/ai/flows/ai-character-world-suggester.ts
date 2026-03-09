'use server';
/**
 * @fileOverview An AI tool to generate creative suggestions for character backstories, motivations, or world details.
 *
 * - aiCharacterWorldSuggester - A function that generates creative suggestions based on a prompt.
 * - AICharacterWorldSuggesterInput - The input type for the aiCharacterWorldSuggester function.
 * - AICharacterWorldSuggesterOutput - The return type for the aiCharacterWorldSuggester function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICharacterWorldSuggesterInputSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A brief prompt or idea for character backstory, motivation, or world details.'
    ),
});
export type AICharacterWorldSuggesterInput = z.infer<
  typeof AICharacterWorldSuggesterInputSchema
>;

const AICharacterWorldSuggesterOutputSchema = z.object({
  suggestion: z
    .string()
    .describe('Creative and detailed suggestions based on the provided prompt.'),
});
export type AICharacterWorldSuggesterOutput = z.infer<
  typeof AICharacterWorldSuggesterOutputSchema
>;

export async function aiCharacterWorldSuggester(
  input: AICharacterWorldSuggesterInput
): Promise<AICharacterWorldSuggesterOutput> {
  return aiCharacterWorldSuggesterFlow(input);
}

const suggestionPrompt = ai.definePrompt({
  name: 'aiCharacterWorldSuggesterPrompt',
  input: {schema: AICharacterWorldSuggesterInputSchema},
  output: {schema: AICharacterWorldSuggesterOutputSchema},
  prompt: `You are a creative assistant for writers. Your goal is to generate detailed and imaginative suggestions for character backstories, motivations, or world details based on the user's input. Provide rich and inspiring ideas that can help overcome creative blocks.

User's prompt: {{{prompt}}}`,
});

const aiCharacterWorldSuggesterFlow = ai.defineFlow(
  {
    name: 'aiCharacterWorldSuggesterFlow',
    inputSchema: AICharacterWorldSuggesterInputSchema,
    outputSchema: AICharacterWorldSuggesterOutputSchema,
  },
  async (input) => {
    const {output} = await suggestionPrompt(input);
    return output!;
  }
);
