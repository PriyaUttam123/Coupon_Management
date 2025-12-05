import React from 'react';

const InputField = ({ label, id, type = 'text', placeholder, value, onChange, required = false, min, step, className = '' }) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                min={min}
                step={step}
                className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
            />
        </div>
    );
};

export default InputField;
