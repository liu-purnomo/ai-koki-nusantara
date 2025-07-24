
import React from 'react';
import { ChefHatIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <ChefHatIcon className="h-8 w-8 text-orange-600 mr-3" />
        <h1 className="text-3xl font-bold font-playfair text-stone-800">
          AI Koki Nusantara
        </h1>
      </div>
    </header>
  );
};
