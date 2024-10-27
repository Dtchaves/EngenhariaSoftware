import React from 'react';

interface FormInputProps {
  name: string;
  placeholder: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ name, placeholder, value, onChange }: FormInputProps) => (
  <input
    type={name}
    name={name}
    placeholder={placeholder}
    value={value ?? ''}
    onChange={onChange}
    className="mb-2 w-full p-2 border border-gray-300 rounded"
  />
);

export default FormInput;
