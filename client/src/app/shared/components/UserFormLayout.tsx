import Link from 'next/link';
import React from 'react';

type UserFormLayoutProps = {
  title: string;
  description: string;
  userRole: string;
  handleUserRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  linkHref: string;
  linkText: string;
  color: {bg: string, text: string};
}

export default function UserFormLayout({
  title,
  description,
  userRole,
  handleUserRoleChange,
  children,
  linkHref,
  linkText,
  color,
}: UserFormLayoutProps){
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col gap-3">
        <h1 className={`text-3xl font-bold ${color.text}`}>{title}</h1>
        <p>{description}</p>
        <div className="w-full max-w-md mx-auto">
          <div>
            <label htmlFor="userRole" className="block mb-2">
              Selecione o tipo de usuário:
            </label>
            <select
              id="userRole"
              value={userRole}
              onChange={handleUserRoleChange}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            >
              <option value="Doctor">Doutor</option>
              <option value="Patient">Paciente</option>
            </select>
          </div>
          {children}
          <Link
            href={linkHref}
            className={`mt-4 w-full ${color.bg} text-white py-2 px-4 rounded transition duration-300`}	
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};