"use client";

import React, { useEffect, useState } from "react";
import { UserColor, UserRole } from "../shared/utils";
import { useRegister } from "./hooks/use-register";
import { RegisterForm } from "./components/register-form";
import UserFormLayout from "../shared/components/UserFormLayout";

export default function Register() {
  const { register, error, setError } = useRegister();

  const [userRole, setUserRole] = useState<UserRole>(UserRole.Doctor);
  const [color, setColor] = useState(UserColor[userRole]);

  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    password: "",
    role: userRole,
  });

  const handleUserRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
    setError(null);
  };

  useEffect(() => {
    setInitialData({
      name: "",
      email: "",
      password: "",
      role: userRole,
    });

    setColor(UserColor[userRole]);
  }, [userRole]);

  const interfaceName = `${userRole}-interface`;

  return (
    <UserFormLayout
      title="Cadastro"
      description="Faça seu cadastro para acessar o sistema"
      userRole={userRole}
      handleUserRoleChange={handleUserRoleChange}
      linkHref="/login"
      linkText="Já tem uma conta? Faça login"
      color={color} // Pass the color class
    >
      {error && (
        <div className="bg-red-500 text-white p-4 text-center">{error}</div>
      )}
      <div
        className={`${interfaceName} w-full max-w-md p-4 my-4 rounded shadow ${color.bg}`}
      >
        <h2 className="text-xl font-bold text-center text-white mb-6">
          Register
        </h2>
        <RegisterForm
          onSubmit={register}
          buttonText="Register"
          initialData={initialData}
          bgColor={color.bg}
        />
      </div>
    </UserFormLayout>
  );
}
