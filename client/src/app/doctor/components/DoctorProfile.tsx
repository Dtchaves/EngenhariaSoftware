// app/medico/components/MyProfile.tsx
import React from "react";
import { useDoctorData } from "../hooks/useDoctorData";

const MyProfile = () => {
  const { data, loading } = useDoctorData();

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Perfil do Médico</h2>
      <p><strong>Nome:</strong> {data?.name}</p>
      <p><strong>Email:</strong> {data?.email}</p>
      <p><strong>Especialidade:</strong> {data?.specialty}</p>
      <p><strong>CRM:</strong> {data?.crm}</p>
    </div>
  );
};

export default MyProfile;
