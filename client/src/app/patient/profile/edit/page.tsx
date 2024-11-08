"use client";
import React, { useState, useEffect } from "react";
import FormInput from "@/app/shared/components/FormInput";
import { EditPatientData } from "@/app/shared/utils";
import { editPatientProfile } from "../hooks/edit-patient-profile";
import { useRouter } from "next/navigation";
import { getPatientProfile } from "../hooks/get-patient-profile";

export default function PatientProfileEditor() {
  //   const getPatientProfile = useGetPatientProfile();
  const [formData, setFormData] = useState<EditPatientData>({
    name: "",
    email: "",
    age: 0,
  });
  const [error, setError] = useState("");
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatientProfile();
      if (!data) {
        setError("Erro ao buscar dados do paciente");
        return;
      }

      setFormData(data);
    };

    fetchData();
  }, [getPatientProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    editPatientProfile(formData, setError);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-3 bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Perfil do Paciente</h2>
        {error && (
          <div className="bg-red-500 text-white p-4 text-center">{error}</div>
        )}
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <FormInput
            placeholder="Nome"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full max-w-xs"
          />
          <FormInput
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full max-w-xs"
          />
          <FormInput
            placeholder="Idade"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full max-w-xs"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              Salvar
            </button>
            <button
              onClick={() => router.push("/patient/profile")}
              className="mt-4 bg-gray-500 text-white p-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
