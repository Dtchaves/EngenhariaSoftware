'use client'
import React, { useEffect, useState } from "react";
import { UserColor, UserRole } from "../shared/utils";
import { LoginForm } from "./components/login-form";
import Layout from "../layout";
import { useLogin } from "./hooks/use-login";

export default function Login() {
  const { login, isAuthenticated } = useLogin();

  const [userRole, setUserRole] = useState<UserRole>(UserRole.Doctor);
  const [bgColor, setBgColor] = useState(UserColor[userRole].bg);

  const [initialData, setInitialData] = useState({
    email: "",
    password: "",
    crm: userRole === UserRole.Doctor ? "" : undefined,
    role: userRole,
  });

  const [isLogin, setIsLogin] = useState(true);

  if (isAuthenticated) {
    return null;
  }

  const handleUserRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
    // console.log(userRole);
  };

  useEffect(() => {
    setInitialData({
      email: "",
      password: "",
      crm: userRole === UserRole.Doctor ? "" : undefined,
      role: userRole,
    });
    console.log(userRole);
    setBgColor(UserColor[userRole].bg);
  }, [userRole]);

  // Different colors for different user roles!
  const interfaceName = `${userRole}-interface`;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-blue-500">Login</h1>
          <p className="text-gray-500">Faça login para acessar o sistema</p>
          <div className="w-full max-w-md mx-auto mt-6">
            <div className="mb-4">
              <label htmlFor="userRole" className="block mb-2">
                Selecione o tipo de usuário:
              </label>
              <select
                id="userRole"
                value={userRole}
                onChange={handleUserRoleChange}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              >
                <option value={UserRole.Doctor}>Doutor</option>
                <option value={UserRole.Patient}>Paciente</option>
              </select>
            </div>

            <div
              className={`${interfaceName} w-full max-w-md p-4 my-4 rounded shadow ${bgColor}`}
            >
              <h2 className="text-xl font-bold text-center text-white mb-6">
                Login
              </h2>
              <LoginForm
                onSubmit={login}
                buttonText="Login"
                initialData={initialData}
                bgColor={bgColor}
              />
            </div>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              {isLogin
                ? "Não tem uma conta? Registre-se"
                : "Já tem uma conta? Faça login"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
