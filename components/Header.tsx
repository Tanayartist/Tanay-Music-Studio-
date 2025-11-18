
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Tanay Music Studio
        </span>
      </h1>
      <p className="mt-2 md:mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Your AI-powered partner for crafting unique lyrics, music, beats, and vocal ideas.
      </p>
    </header>
  );
};

export default Header;
