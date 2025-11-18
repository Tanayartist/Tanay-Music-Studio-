
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg mt-6">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
      </div>
      <div className="p-4 md:p-6 text-gray-300 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
};

export default Card;
