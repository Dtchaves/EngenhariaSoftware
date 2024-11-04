// app/paciente/components/MyProfile.tsx
import React from "react";
import { usePatientData } from "../hooks/usePatientData";

const PatientProfile = ({ patientId }: { patientId: string }) => {
  const { data, loading, error } = usePatientData(patientId);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Perfil do Paciente</h2>
      <p><strong>Nome:</strong> {data?.name}</p>
      <p><strong>Email:</strong> {data?.email}</p>
      <p><strong>Idade:</strong> {data?.age}</p>
      <p><strong>ID do Médico:</strong> {data?.doctor_id}</p>
    </div>
  );
};

export default PatientProfile;
