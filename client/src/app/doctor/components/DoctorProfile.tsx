"use client"
// app/doctor/components/DoctorProfile.tsx
import React from "react";
import { useDoctorData } from "../hooks/useDoctorData";
import useEditDoctor from "../hooks/useEditDoctor";
import DoctorProfileEditor from "./DoctorProfileEditor";
import { EditDoctorData } from "@/app/shared/utils";

const DoctorProfile = () => {
  const { data, loading, error, setError } = useDoctorData();
  const [isEditing, setIsEditing] = React.useState(false);
  const initialData: EditDoctorData = {
    name: data?.name ?? "",
    email: data?.email ?? "",
    specialization: data?.specialization ?? "",
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Perfil do Médico</h2>

      {isEditing ? (
        <DoctorProfileEditor
          initialData={initialData}
          onCancel={handleCancelClick}
          setIsEditing={setIsEditing}
          setError={setError}
        />
      ) : (
        <div>
          <p>
            <strong>Nome:</strong> {data?.name}
          </p>
          <p>
            <strong>Email:</strong> {data?.email}
          </p>
          <p>
            <strong>Especialidade:</strong> {data?.specialization}
          </p>
          <p>
            <strong>CRM:</strong> {data?.crm}
          </p>
          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
