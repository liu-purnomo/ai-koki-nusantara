import { GoogleGenAI, Type } from '@google/genai';
import type { Recipe } from '../types';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable not set');
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: 'Nama resep masakan khas Indonesia yang dibuat.',
    },
    description: {
      type: Type.STRING,
      description:
        'Deskripsi singkat dan menarik tentang hidangan ini (2-3 kalimat).',
    },
    ingredients: {
      type: Type.ARRAY,
      description: 'Daftar lengkap bahan-bahan yang dibutuhkan.',
      items: { type: Type.STRING },
    },
    instructions: {
      type: Type.ARRAY,
      description: 'Langkah-langkah memasak yang jelas dan berurutan.',
      items: { type: Type.STRING },
    },
    servings: {
      type: Type.STRING,
      description:
        "Jumlah porsi yang dihasilkan dari resep ini (contoh: '2-3 porsi').",
    },
    prepTime: {
      type: Type.STRING,
      description: "Waktu persiapan yang dibutuhkan (contoh: '15 menit').",
    },
  },
  required: [
    'recipeName',
    'description',
    'ingredients',
    'instructions',
    'servings',
    'prepTime',
  ],
};

export const generateRecipeAndImage = async (
  userIngredients: string,
  shouldGenerateImage: boolean
): Promise<{
  recipe: Recipe;
  imageUrl: string | null;
  imageError?: string;
}> => {
  try {
    // Step 1: Generate the recipe text (critical step)
    const recipePrompt = `
      Anda adalah seorang koki ahli masakan Nusantara. Berdasarkan bahan-bahan berikut: "${userIngredients}", buatkan satu resep masakan Indonesia yang lezat dan mudah diikuti.
      Jika bahan yang diberikan tidak mencukupi atau tidak cocok untuk masakan Indonesia, gunakan kreativitas Anda untuk membuat resep populer seperti Nasi Goreng, Rendang, atau Soto Ayam.
      Fokus pada resep yang otentik dan berikan instruksi yang jelas. Pastikan nama resepnya berbahasa Indonesia.
    `;

    const recipeResult = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: recipePrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: recipeSchema,
        temperature: 0.8,
      },
    });

    const recipeJsonText = recipeResult?.text?.trim();
    if (!recipeJsonText) {
      throw new Error(
        'AI tidak memberikan respon resep. Coba lagi dengan bahan yang berbeda.'
      );
    }

    let recipe: Recipe;
    try {
      recipe = JSON.parse(recipeJsonText);
    } catch (e) {
      console.error('JSON Parsing Error:', e, 'Raw Text:', recipeJsonText);
      throw new Error(
        'Gagal memproses respon resep dari AI karena format JSON tidak valid.'
      );
    }

    if (!shouldGenerateImage) {
      return { recipe, imageUrl: null };
    }

    // Step 2: Generate an image based on the recipe name (optional step)
    try {
      const imagePrompt = `
          Fotografi makanan profesional, hidangan "${recipe.recipeName}", sebuah masakan klasik Indonesia.
          Disajikan dengan indah di atas piring keramik dengan latar belakang kayu yang hangat dan pencahayaan alami yang lembut.
          Terlihat sangat lezat dan menggugah selera.
        `;

      const imageResult = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: imagePrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '4:3',
        },
      });

      if (
        !imageResult.generatedImages ||
        imageResult.generatedImages.length === 0
      ) {
        throw new Error('AI tidak memberikan respon gambar.');
      }

      const base64ImageBytes: string | undefined =
        imageResult?.generatedImages[0]?.image?.imageBytes;
      const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

      return { recipe, imageUrl };
    } catch (imageError) {
      console.error('Gemini Image Generation Error:', imageError);
      const errorMessage =
        imageError instanceof Error
          ? imageError.message
          : 'Terjadi kesalahan yang tidak diketahui.';
      return {
        recipe,
        imageUrl: null,
        imageError: `Pembuatan gambar gagal. ${errorMessage}`,
      };
    }
  } catch (error) {
    console.error('Gemini API Error (Recipe Generation):', error);
    if (error instanceof Error) {
      throw new Error(`Gagal membuat resep: ${error.message}`);
    }
    throw new Error(
      'Terjadi kesalahan yang tidak diketahui saat membuat resep.'
    );
  }
};
