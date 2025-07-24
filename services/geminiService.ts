
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "Nama resep masakan khas Indonesia yang dibuat."
    },
    description: {
      type: Type.STRING,
      description: "Deskripsi singkat dan menarik tentang hidangan ini (2-3 kalimat)."
    },
    ingredients: {
      type: Type.ARRAY,
      description: "Daftar lengkap bahan-bahan yang dibutuhkan.",
      items: { type: Type.STRING }
    },
    instructions: {
      type: Type.ARRAY,
      description: "Langkah-langkah memasak yang jelas dan berurutan.",
      items: { type: Type.STRING }
    },
    servings: {
        type: Type.STRING,
        description: "Jumlah porsi yang dihasilkan dari resep ini (contoh: '2-3 porsi')."
    },
    prepTime: {
        type: Type.STRING,
        description: "Waktu persiapan yang dibutuhkan (contoh: '15 menit')."
    }
  },
  required: ["recipeName", "description", "ingredients", "instructions", "servings", "prepTime"]
};

export const generateRecipeAndImage = async (userIngredients: string): Promise<{ recipe: Recipe; imageUrl: string }> => {
  try {
    // Step 1: Generate the recipe text
    const recipePrompt = `
      Anda adalah seorang koki ahli masakan Nusantara. Berdasarkan bahan-bahan berikut: "${userIngredients}", buatkan satu resep masakan Indonesia yang lezat dan mudah diikuti.
      Jika bahan yang diberikan tidak mencukupi atau tidak cocok untuk masakan Indonesia, gunakan kreativitas Anda untuk membuat resep populer seperti Nasi Goreng, Rendang, atau Soto Ayam.
      Fokus pada resep yang otentik dan berikan instruksi yang jelas. Pastikan nama resepnya berbahasa Indonesia.
    `;

    const recipeResult = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: recipePrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.8,
      },
    });
    
    const recipeJsonText = recipeResult.text.trim();
    if (!recipeJsonText) {
        throw new Error("AI tidak memberikan respon resep. Coba lagi dengan bahan yang berbeda.");
    }

    const recipe: Recipe = JSON.parse(recipeJsonText);

    // Step 2: Generate an image based on the recipe name
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

    if (!imageResult.generatedImages || imageResult.generatedImages.length === 0) {
        throw new Error("Gagal membuat gambar untuk resep ini.");
    }

    const base64ImageBytes: string = imageResult.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

    return { recipe, imageUrl };

  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error && error.message.includes("JSON")) {
      throw new Error("Gagal memproses respon dari AI. Format tidak valid.");
    }
    throw new Error("Gagal berkomunikasi dengan AI. Periksa koneksi atau kunci API Anda.");
  }
};
