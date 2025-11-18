
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        className="block w-full shadow-sm sm:text-sm bg-white/5 border border-white/20 rounded-md text-white focus:ring-purple-500 focus:border-purple-500"
      />
    </div>
  );
};

export default TextArea;
