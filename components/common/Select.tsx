
import React from 'react';
import type { Option } from '../../types';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <select
        {...props}
        className="block w-full pl-3 pr-10 py-2 text-base bg-white/5 border border-white/20 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-800 text-white">
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
