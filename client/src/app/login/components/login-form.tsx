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
  
  console.log(userData, initialData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setUserData({ ...userData, role: initialData.role });
    console.log(userData);
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 ${bgColor} rounded shadow`}>
      <FormInput placeholder="Email" name="email" value={userData.email} onChange={handleChange} />
      {(initialData.crm != undefined) && <FormInput placeholder="CRM" name="crm" value={userData.crm} onChange={handleChange} />}
      <FormInput placeholder="Password" name="password" value={userData.password} onChange={handleChange} />
      <button type="submit" className={`w-full p-2 text-white ${bgColor} rounded hover:bg-green-600`}>{buttonText}</button>
    </form>
  );
};