'use client';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {CoffeeIcon, Loader2} from 'lucide-react';
import {useState, useTransition} from 'react';
import {generateRecipe} from './actions';

const brewingDevices = [
  ['V60', 'V60'],
  ['Chemex', 'CHEMEX'],
  ['Aeropress', 'AEROPRESS'],
  ['French Press', 'FRENCH_PRESS'],
  ['Kalita Wave', 'KALITA_WAVE'],
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function RecipeGenerator() {
  const [device, setDevice] = useState<string>('');
  const [isGenerating, startTransition] = useTransition();
  const [recipe, setRecipe] = useState<string>('');

  function handleGenerate() {
    startTransition(async () => {
      while (true) {
        let retries = 0;
        try {
          const result = await generateRecipe(device);
          setRecipe(formatResult(result));
          break;
        } catch (error) {
          if (retries < 3) {
            retries++;
            console.warn('Failed to generate recipe, retrying...');
            await sleep(1000);
            continue;
          }
          console.error(error);
          break;
        }
      }
    });
  }

  return (
    <>
      <div className="space-y-2">
        <label
          htmlFor="device-select"
          className="text-sm font-medium text-gray-700"
        >
          Select your brewing device:
        </label>
        <Select onValueChange={setDevice} value={device}>
          <SelectTrigger id="device-select">
            <SelectValue placeholder="Choose a device" />
          </SelectTrigger>
          <SelectContent>
            {brewingDevices.map(([name, key]) => (
              <SelectItem key={key} value={key}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleGenerate}
        disabled={!device || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <CoffeeIcon className="mr-2 h-4 w-4" />
            Generate Recipe
          </>
        )}
      </Button>
      {recipe && (
        <div className="mt-4 p-4 bg-amber-50 rounded-md">
          <h3 className="font-semibold mb-2">Your Recipe:</h3>
          <p>{recipe}</p>
        </div>
      )}
    </>
  );
}

type PromiseResult<T> = T extends Promise<infer U> ? U : never;

function formatResult(
  result: PromiseResult<ReturnType<typeof generateRecipe>>,
): string {
  if (result === 'UNAUTHORIZED') {
    return 'You must first sign in to generate a recipe.';
  }
  if (result === 'RATE_LIMITED') {
    return 'You have reached the daily limit for generating recipes. Come back tomorrow!';
  }
  return [
    `${result.dose}g coffee, ${result.grindSize} grind.`,
    `${result.waterVolume}ml water at ${result.waterTemperature}°C.`,
    result.steps.join(' '),
    `Total brew time: ${result.totalBrewTime}.`,
  ].join(' ');
}

// 15g coffee, medium-fine grind. 250ml water at 96°C. 30s bloom, then pour in spirals. Total brew time: 2:30.
