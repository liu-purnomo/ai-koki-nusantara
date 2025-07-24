
import React from 'react';
import { ChefHatIcon } from './icons';

export const Welcome: React.FC = () => {
    return (
        <div className="text-center p-8 bg-white/50 rounded-lg border border-dashed border-stone-300">
            <ChefHatIcon className="mx-auto h-12 w-12 text-stone-400" />
            <h2 className="mt-4 text-xl font-semibold text-stone-700">Selamat Datang di AI Koki Nusantara</h2>
            <p className="mt-2 text-stone-500">
                Masukkan bahan-bahan yang Anda miliki di atas, dan biarkan keajaiban AI menciptakan resep masakan Indonesia yang sempurna untuk Anda.
            </p>
        </div>
    );
}
