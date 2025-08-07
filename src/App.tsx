import { useState } from 'react';
import { FavoriteFoods } from './components/FavoriteFoods';
import { Allergies } from './components/Allergies';
import { DislikedFoods } from './components/DislikedFoods';
import { SpecialInstructions } from './components/SpecialInstructions';
import { ProfileHeader } from './components/ProfileHeader';

type FoodItem = {
  id: string;
  name: string;
  category?: string;
};

type DislikedFood = FoodItem & {
  severity: 'mild' | 'strong' | 'absolute';
};

type Allergy = {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  isCommon: boolean;
};

type UserProfile = {
  name: string;
  birthday: string;
  emoji: string;
  lastOnline: string;
};

export default function App() {
  const [favoriteFoods, setFavoriteFoods] = useState<FoodItem[]>([]);
  const [dislikedFoods, setDislikedFoods] = useState<DislikedFood[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [instructions, setInstructions] = useState('');

  const userProfile: UserProfile = {
    name: 'Michael Mohr',
    birthday: '16.12.1970',
    emoji: '🚀',
    lastOnline: 'vor 2 Monate'
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center gap-4 p-4">
          <img
            src="/zenaris-logo.png"
            alt="Zenaris Logo"
            className="h-12 w-auto"
          />
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-black">Meal Preferences</h2>
          </div>
        </header>

        <ProfileHeader userProfile={userProfile} />

        <FavoriteFoods foods={favoriteFoods} setFoods={setFavoriteFoods} />
        <DislikedFoods foods={dislikedFoods} setFoods={setDislikedFoods} />
        <Allergies allergies={allergies} setAllergies={setAllergies} />
        <SpecialInstructions instructions={instructions} setInstructions={setInstructions} />

        <div className="bg-white p-6 rounded-xl shadow-sm flex justify-end gap-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}