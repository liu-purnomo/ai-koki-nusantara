
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IngredientForm } from './components/IngredientForm';
import { RecipeDisplay } from './components/RecipeDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorAlert } from './components/ErrorAlert';
import { generateRecipeAndImage } from './services/geminiService';
import type { Recipe } from './types';
import { Footer } from './components/Footer';
import { Welcome } from './components/Welcome';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!ingredients.trim()) {
      setError('Silakan masukkan bahan-bahan terlebih dahulu.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setImageUrl(null);

    try {
      const result = await generateRecipeAndImage(ingredients);
      setRecipe(result.recipe);
      setImageUrl(result.imageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat resep. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  const handleSuggestionClick = (suggestion: string) => {
    setIngredients(suggestion);
  };

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-8">
          <IngredientForm
            ingredients={ingredients}
            setIngredients={setIngredients}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            onSuggestionClick={handleSuggestionClick}
          />

          {error && <ErrorAlert message={error} />}

          {isLoading && <LoadingSpinner />}
          
          {!isLoading && !error && !recipe && <Welcome />}

          {!isLoading && !error && recipe && imageUrl && (
            <RecipeDisplay recipe={recipe} imageUrl={imageUrl} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
