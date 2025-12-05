import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = ({ label, id, options, value, onChange, placeholder, className = '' }) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <select
                    name={id}
                    id={id}
                    className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 appearance-none disabled:opacity-60"
                    value={value}
                    onChange={onChange}
                >
                    {placeholder && <option value="" disabled>{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
};

export default SelectField;
