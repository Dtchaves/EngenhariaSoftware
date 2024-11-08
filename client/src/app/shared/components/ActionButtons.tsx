"use client";
import Link from "next/link";
import { deleteProfile } from "../hooks/delete-profile";
import { startTransition, useActionState } from "react";

interface ActionButtonsProps {
  userRole: "patient" | "doctor";
}

export default function ActionButtons({ userRole }: ActionButtonsProps) {
  const [state, formAction] = useActionState(deleteProfile, { message: "" });

  const handleDeleteClick = () => {
    if (window.confirm("Tem certeza que deseja deletar seu perfil?")) {
      startTransition(() => {
        formAction(userRole);
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/${userRole}/profile/edit`}
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
