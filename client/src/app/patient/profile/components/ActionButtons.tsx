"use client";
import Link from "next/link";
import { deletePatientProfile } from "../hooks/delete-patient-profile";

export default function ActionButtons() {
  const handleDeleteClick = () => {
    if (window.confirm("Tem certeza que deseja deletar seu perfil?")) {
      deletePatientProfile();
    }
  };

  return (
    <div className="flex gap-2">
      <Link
        href="/patient/profile/edit"
        className="bg-green-500 text-white p-2 rounded"
      >
        Editar
      </Link>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 text-white p-2 rounded"
      >
        Apagar perfil
      </button>
    </div>
  );
}
