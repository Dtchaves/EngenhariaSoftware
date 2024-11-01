import React, { useEffect, useState } from 'react';
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
    <form onSubmit={handleSubmit} className={`p-4 ${bgColor} rounded shadow`}>
      <FormInput
        name="name"
        placeholder="Name"
        value={userData.name}
        onChange={handleChange}
        className={userData.name ? 'font-bold' : ''}
      />
      <FormInput
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        className={userData.email ? 'font-bold' : ''}
      />
      <FormInput
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
        className={userData.password ? 'font-bold' : ''}
      />
      {initialData.role === UserRole.Doctor && (
        <>
          <FormInput
            name="crm"
            placeholder="CRM"
            value={userData.crm}
            onChange={handleChange}
            className={userData.crm ? 'font-bold' : ''}
          />
          <FormInput
            name="specialization"
            placeholder="Specialization"
            value={userData.specialization}
            onChange={handleChange}
            className={userData.specialization ? 'font-bold' : ''}
          />
        </>
      )}
      {initialData.role === UserRole.Patient && (
        <>
          <FormInput
            name="age"
            placeholder="Age"
            value={userData.age?.toString()}
            onChange={handleChange}
            className={userData.age ? 'font-bold' : ''}
          />
          <FormInput
            name="doctor_id"
            placeholder="Doctor ID"
            value={userData.doctor_id?.toString()}
            onChange={handleChange}
            className={userData.doctor_id ? 'font-bold' : ''}
          />
        </>
      )}
      <button type="submit" className={`w-full p-2 text-white ${bgColor} border border-solid rounded`}>{buttonText}</button>
    </form>
  );
};