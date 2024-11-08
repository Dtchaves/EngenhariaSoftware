"use client";

import React, { useEffect, useState } from "react";
import { UserColor, UserRole } from "../shared/utils";
import { LoginForm } from "./components/login-form";
import { useLogin } from "./hooks/use-login";
import UserFormLayout from "../shared/components/UserFormLayout";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  const { login, error, setError } = useLogin();

  const [userRole, setUserRole] = useState<UserRole>(UserRole.Doctor);
  const [color, setColor] = useState(UserColor[userRole]);

  const [initialData, setInitialData] = useState({
    email: "",
    password: "",
    crm: userRole === UserRole.Doctor ? "" : undefined,
    role: userRole,
  });

  const handleUserRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
    setError(null);
  };

  useEffect(() => {
    setInitialData({
      email: "",
      password: "",
      crm: userRole === UserRole.Doctor ? "" : undefined,
      role: userRole,
    });
    setColor(UserColor[userRole]);
  }, [userRole]);

  const interfaceName = `${userRole}-interface`;

  return (
    <UserFormLayout
      title="Login"
      description="Faça login para usar o sistema"
      userRole={userRole}
      handleUserRoleChange={handleUserRoleChange}
      linkHref="/register"
      linkText="Não tem uma conta? Registre-se"
      color={color} // Pass the color class
    >
      {error && (
        <div className="bg-red-500 text-white p-4 text-center">{error}</div>
      )}
      <div
        className={`${interfaceName} w-full max-w-md p-4 my-4 rounded shadow ${color.bg}`}
      >
        <h2 className="text-xl font-bold text-center text-white mb-6">Login</h2>
        <LoginForm
          onSubmit={login}
          buttonText="Login"
          initialData={initialData}
          bgColor={color.bg}
        />
      </div>
    </UserFormLayout>
  );
}
