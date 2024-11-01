'use client'
import React, { useEffect, useState } from 'react';
import FormInput from '@/app/shared/components/FormInput';
import { LoginCredentials } from '@/app/shared/utils';

interface LoginFormProps {
  onSubmit: (user: LoginCredentials) => void;
  initialData: LoginCredentials; 
  buttonText: string;
  bgColor: string;
}

export const LoginForm = ({ onSubmit, initialData, buttonText, bgColor }: LoginFormProps) => {
  const [userData, setUserData] = useState<LoginCredentials>(initialData);
  
  useEffect(() => {
    setUserData(initialData);
  }, [initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 ${bgColor} rounded shadow`}>
      <FormInput
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        className={userData.email ? 'font-bold' : ''}
      />
      {initialData.crm !== undefined && (
        <FormInput
          placeholder="CRM"
          name="crm"
          value={userData.crm}
          onChange={handleChange}
          className={userData.crm ? 'font-bold' : ''}
        />
      )}
      <FormInput
        placeholder="Password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        className={userData.password ? 'font-bold' : ''}
      />
      <button type="submit" className={`w-full p-2 text-white ${bgColor} border border-solid rounded`}>{buttonText}</button>
    </form>
  );
};