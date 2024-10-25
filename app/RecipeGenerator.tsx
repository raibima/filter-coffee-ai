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
import {useState} from 'react';

const brewingDevices = [
  'V60',
  'Chemex',
  'AeroPress',
  'French Press',
  'Kalita Wave',
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateRecipe = (device: string) => {
  // This is a mock function to simulate AI-generated recipes
  const recipes: Record<string, string> = {
    V60: '15g coffee, medium-fine grind. 250ml water at 96°C. 30s bloom, then pour in spirals. Total brew time: 2:30.',
    Chemex:
      '30g coffee, medium-coarse grind. 500ml water at 94°C. 45s bloom, then two more pours. Total brew time: 4:00.',
    AeroPress:
      '17g coffee, fine grind. 220ml water at 88°C. Inverted method, steep for 1:30, then press for 30s.',
    'French Press':
      '30g coffee, coarse grind. 500ml water at 93°C. Steep for 4 minutes, then plunge slowly.',
    'Kalita Wave':
      '20g coffee, medium grind. 300ml water at 95°C. 30s bloom, then three even pours. Total brew time: 3:00.',
  };
  return recipes[device] || 'Recipe not available for this device.';
};

export default function RecipeGenerator() {
  const [device, setDevice] = useState<string>('');

  // TODO
  const recipe = '';
  const isGenerating = false;

  function handleGenerate() {}

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
            {brewingDevices.map((dev) => (
              <SelectItem key={dev} value={dev}>
                {dev}
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
