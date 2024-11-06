"use client"
import React from "react";
import FormInput from "@/app/shared/components/FormInput";
import { EditDoctorData } from "@/app/shared/utils";
import useEditDoctorProfile from "../hooks/useEditDoctorProfile";

interface DoctorProfileEditorProps {
  initialData: EditDoctorData;
  onCancel: () => void;
  setIsEditing: (isEditing: boolean) => void;
  setError: (error: string) => void;
}

export default function DoctorProfileEditor({ initialData, onCancel, setIsEditing, setError }: DoctorProfileEditorProps) {
  const [formData, setFormData] = React.useState<EditDoctorData>(initialData || {
    name: "",
    email: "",
    specialization: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const editDoctorProfile = useEditDoctorProfile();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    editDoctorProfile(formData, setError);
  };


  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Perfil do Médico</h2>
      <form onSubmit={handleSave}>
      <FormInput
        placeholder="Nome"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <FormInput
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <FormInput
        placeholder="Especialidade"
        name="specialization"
        value={formData.specialization}
        onChange={handleInputChange}
      />
      <button type='submit' className="mt-4 bg-green-500 text-white p-2 rounded">Salvar</button>
      <button onClick={onCancel} className="mt-4 ml-2 bg-gray-500 text-white p-2 rounded">Cancelar</button>
    </form>
    </div>
  );
};
