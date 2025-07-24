
import React from 'react';
import { SparklesIcon } from './icons';

interface IngredientFormProps {
  ingredients: string;
  setIngredients: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = ["Ayam, bawang, kecap manis", "Tahu, telur, tauge", "Daging sapi, santan, kelapa parut"];

export const IngredientForm: React.FC<IngredientFormProps> = ({ ingredients, setIngredients, onGenerate, isLoading, onSuggestionClick }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200 w-full">
      <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-stone-700">Punya bahan apa di dapur?</h2>
          <p className="text-stone-500 mt-1">Masukkan bahan-bahan Anda, biarkan AI kami yang meracik resepnya.</p>
      </div>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Contoh: Nasi sisa, telur, bawang merah, cabai..."
        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
        rows={3}
        disabled={isLoading}
      />
      <div className="text-sm text-stone-500 mt-2 mb-4">
        Inspirasi: 
        {suggestions.map((s, i) => (
          <button 
            key={i} 
            onClick={() => onSuggestionClick(s)} 
            className="ml-2 text-orange-600 hover:underline"
            disabled={isLoading}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading || !ingredients.trim()}
        className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-700 disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Meracik Resep...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5 mr-2" />
            Buatkan Resep Ajaib
          </>
        )}
      </button>
    </div>
  );
};
