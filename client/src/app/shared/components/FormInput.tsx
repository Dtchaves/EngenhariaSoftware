import React from 'react';

interface FormInputProps {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional className prop
}

const FormInput = ({ name, placeholder, value, onChange, className}: FormInputProps) => (
  <input
    type={name}
    name={name}
    placeholder={placeholder}
    value={value ?? ''}
    onChange={onChange}
    className={`w-full p-2 mb-2 border border-gray-300 rounded ${className}`}
    />
);

export default FormInput;