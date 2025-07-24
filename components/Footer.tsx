import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 bg-white/50 py-4">
      <div className="container mx-auto text-center text-sm text-stone-500">
        Oleh <a href="https://liupurnomo.com">Liu Purnomo</a>
        <p>
          Ditenagai oleh Google Gemini API. Dibuat dengan cinta untuk kuliner
          Indonesia.
        </p>
      </div>
    </footer>
  );
};
