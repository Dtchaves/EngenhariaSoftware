import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RegisterCredentials, UserRole } from '@/app/shared/utils';
import FormInput from '@/app/shared/components/FormInput';

interface RegisterFormProps {
  onSubmit: (user: RegisterCredentials) => void;
  initialData: RegisterCredentials;
  buttonText: string;
  bgColor: string;
}

export const RegisterForm = ({ onSubmit, initialData, buttonText, bgColor }: RegisterFormProps) => {
  const [userData, setUserData] = useState<RegisterCredentials>(initialData);
  // console.log(userData);
  useEffect(() => {
    setUserData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({ ...userData, role: initialData.role });
    console.log(userData);
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 bg-${bgColor}-100 rounded shadow`}>
      <FormInput name="name" placeholder="Name" value={userData.name} onChange={handleChange} />
      <FormInput name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
      <FormInput name="password" placeholder="Password" value={userData.password} onChange={handleChange} />
      {initialData.role === UserRole.Doctor && (
        <>
          <FormInput name="crm" placeholder="CRM" value={userData.crm} onChange={handleChange} />
          <FormInput name="specialization" placeholder="Specialization" value={userData.specialization} onChange={handleChange} />
        </>
      )}
      {initialData.role === UserRole.Patient && (
        <>
          <FormInput name="age" placeholder="Age" value={userData.age?.toString()} onChange={handleChange} />
          <FormInput name="doctor_id" placeholder="Doctor ID" value={userData.doctor_id?.toString()} onChange={handleChange} />
        </>
      )}
      <button type="submit" className={`w-full p-2 text-white bg-${bgColor}-500 rounded hover:bg-green-600`}>{buttonText}</button>
    </form>
  );
};