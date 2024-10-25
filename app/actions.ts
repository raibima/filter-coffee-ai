'use server';

import {generateObject} from 'ai';
import {openai} from '@ai-sdk/openai';
import {z} from 'zod';
import {signIn, signOut as signOutImpl, auth} from './auth';
import {rateLimit} from './rateLimit';

const recipeSchema = z.object({
  dose: z.number(),
  grindSize: z.enum([
    'fine',
    'medium-fine',
    'medium',
    'medium-coarse',
    'coarse',
  ]),
  waterTemperature: z.number(),
  waterVolume: z.number(),
  steps: z.array(z.string()),
  totalBrewTime: z.string(),
});

const deviceType = z.enum([
  'V60',
  'CHEMEX',
  'AEROPRESS',
  'FRENCH_PRESS',
  'KALITA_WAVE',
  'HARIO_SWITCH',
]);

type Recipe = z.infer<typeof recipeSchema>;

function createPrompt(device: z.infer<typeof deviceType>) {
  return `Generate a filter coffee recipe. Brewing device: ${device}. Example recipes:
V60: 15g coffee, medium-fine grind. 250ml water at 96°C. 30s bloom, then pour in spirals. Total brew time: 2:30.
CHEMEX: 30g coffee, medium-coarse grind. 500ml water at 94°C. 45s bloom, then two more pours. Total brew time: 4:00.
`;
}

export async function generateRecipe(
  device: string,
): Promise<Recipe | 'UNAUTHORIZED' | 'RATE_LIMITED' | 'UNSUPPORTED_DEVICE'> {
  const session = await auth();
  if (!session?.user?.email) {
    return 'UNAUTHORIZED';
  }
  const userEmail = session.user.email;
  if (userEmail !== process.env.NO_RATE_LIMIT) {
    const {success} = await rateLimit.limit(session.user.email!);
    if (!success) {
      return 'RATE_LIMITED';
    }
  }
  const parseResult = deviceType.safeParse(device);
  if (!parseResult.success) {
    return 'UNSUPPORTED_DEVICE';
  }
  const result = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: recipeSchema,
    prompt: createPrompt(parseResult.data),
    temperature: 0.9,
  });
  return result.object;
}

export async function signIntoGoogle() {
  await signIn('google');
}

export async function signOut() {
  const session = await auth();
  if (session?.user) {
    await signOutImpl();
  }
}
