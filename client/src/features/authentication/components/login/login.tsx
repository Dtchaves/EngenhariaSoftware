import React, { useEffect, useState } from "react";
import { UserColor, UserRole } from "@/types/types";
import { useAuth } from "../../hooks/use-auth";
import { LoginForm } from "./login-form";

export function Login() {
  const { login } = useAuth();

  const [userRole, setUserRole] = useState<UserRole>(UserRole.Doctor);
  const [bgColor, setBgColor] = useState(UserColor[userRole].bg);

  const [initialData, setInitialData] = useState({
    email: "",
    password: "",
    crm: userRole === UserRole.Doctor ? "" : undefined,
    role: userRole,
  });

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
    <>
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
          <option value={UserRole.Admin}>Admin</option>
        </select>
      </div>

      <div
        className={`${interfaceName} w-full max-w-md p-4 my-4 rounded shadow ${bgColor}`}
      >
        <h2 className="text-xl font-bold text-center text-white mb-6">Login</h2>
        <LoginForm
          onSubmit={login}
          buttonText="Login"
          initialData={initialData}
          bgColor={bgColor}
        />
      </div>
    </>
  );
}
