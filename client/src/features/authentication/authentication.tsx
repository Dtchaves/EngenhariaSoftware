import React, { useState } from "react";
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";

interface AuthenticationProps {
  isAuthenticated: boolean;
}

export function Authentication({ isAuthenticated }: AuthenticationProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {isLogin ? <Login /> : <Register />}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        {isLogin
          ? "Não tem uma conta? Registre-se"
          : "Já tem uma conta? Faça login"}
      </button>
    </div>
  );
}
