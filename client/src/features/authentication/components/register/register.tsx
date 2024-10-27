import React, { useState, useEffect } from "react";
import { UserColor, UserRole } from "@/types/types";
import { useAuth } from "../../hooks/use-auth";
import { CreateUserForm } from "./create-user-form";

export function Register() {
  const { register } = useAuth();

  const [userRole, setUserRole] = useState(UserRole.Doctor);
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    password: "",
    role: userRole,
  });
  const [bgColor, setBgColor] = useState(UserColor[userRole].bg);

  const handleUserRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
  };

  useEffect(() => {
    setInitialData({
      name: "",
      email: "",
      password: "",
      role: userRole,
    });

    setBgColor(UserColor[userRole].bg);
  }, [userRole]);
  

  return (
    <>
      <div className="mb-4 bg-blue">
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
        className={`${userRole}-interface ${bgColor} w-full max-w-md p-4 my-4 rounded shadow`}
      >
        <h2 className="text-xl font-bold text-center text-white mb-6">Register</h2>
        <CreateUserForm onSubmit={register} buttonText="Register" bgColor={bgColor} initialData={initialData} />
      </div>
    </>
  );
}