
import React, { useState, useEffect } from 'react';
import type { Recipe } from '../types';
import { BookOpenIcon, CameraIcon, ClockIcon, UsersIcon } from './icons';

interface RecipeDisplayProps {
  recipe: Recipe;
  imageUrl: string | null;
}

type ActiveTab = 'recipe' | 'image';

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, imageUrl }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('recipe');

  useEffect(() => {
    // If imageUrl becomes null (e.g., user unchecks the box), reset to recipe tab.
    if (!imageUrl) {
      setActiveTab('recipe');
    }
  }, [imageUrl]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden animate-fade-in">
      <div className="border-b border-stone-200">
        <nav className="flex space-x-1 p-1 bg-amber-50/50" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('recipe')}
            className={`flex items-center ${imageUrl ? 'w-1/2' : 'w-full'} justify-center px-3 py-2 font-medium text-sm rounded-lg ${
              activeTab === 'recipe'
                ? 'bg-orange-600 text-white shadow'
                : 'text-stone-600 hover:bg-stone-200'
            } transition-all duration-200`}
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Resep
          </button>
          {imageUrl && (
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center w-1/2 justify-center px-3 py-2 font-medium text-sm rounded-lg ${
                activeTab === 'image'
                  ? 'bg-orange-600 text-white shadow'
                  : 'text-stone-600 hover:bg-stone-200'
              } transition-all duration-200`}
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              Foto Hidangan
            </button>
          )}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'recipe' ? (
          <div className="animate-fade-in-slow">
            <h2 className="text-3xl font-bold font-playfair text-stone-800">{recipe.recipeName}</h2>
            <p className="mt-2 text-stone-600 italic">{recipe.description}</p>
            
            <div className="flex items-center space-x-6 text-stone-500 my-4 border-t border-b border-stone-200 py-3">
                <div className="flex items-center"><ClockIcon className="h-5 w-5 mr-1.5 text-orange-500" /> Waktu: {recipe.prepTime}</div>
                <div className="flex items-center"><UsersIcon className="h-5 w-5 mr-1.5 text-orange-500" /> Porsi: {recipe.servings}</div>
            </div>

            <div className="grid md:grid-cols-12 gap-6 mt-4">
              <div className="md:col-span-4">
                <h3 className="text-lg font-semibold text-stone-700 border-b-2 border-orange-500 pb-1 mb-2">Bahan-bahan</h3>
                <ul className="list-disc list-inside space-y-1 text-stone-600">
                  {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
              <div className="md:col-span-8">
                <h3 className="text-lg font-semibold text-stone-700 border-b-2 border-orange-500 pb-1 mb-2">Cara Memasak</h3>
                <ol className="list-decimal list-inside space-y-2 text-stone-600">
                  {recipe.instructions.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          imageUrl && (
            <div className="animate-fade-in-slow">
              <h3 className="text-xl font-semibold text-stone-700 text-center mb-4">Visualisasi Hidangan: {recipe.recipeName}</h3>
              <img src={imageUrl} alt={`Generated image of ${recipe.recipeName}`} className="rounded-lg shadow-md w-full h-auto object-cover" />
            </div>
          )
        )}
      </div>
    </div>
  );
};
