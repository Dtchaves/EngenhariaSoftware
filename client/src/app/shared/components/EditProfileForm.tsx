// app/shared/components/EditProfileForm.tsx
"use client";
import { useActionState } from "react";
import { EditDoctorData, EditPatientData, ErrorResponse } from "../utils";
import Link from "next/link";

interface EditProfileFormProps {
  initialData: EditDoctorData | EditPatientData;
  userRole: "doctor" | "patient";
  onSubmit: (currentState: any, formData: FormData) => Promise<ErrorResponse>;
}

export function EditProfileForm({
  initialData,
  userRole,
  onSubmit,
}: EditProfileFormProps) {
  const [state, formAction] = useActionState(onSubmit, { message: "" });

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     // setinitialData({ ...initialData, [e.target.name]: e.target.value });
  //   };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     onSubmit(initialData);
  //   };

  return (
    <div>
      {state.message && (
        <div className="bg-red-500 text-white p-4 text-center">
          {state.message}
        </div>
      )}
      <form
        action={formAction}
        className="bg-white p-4 rounded-lg shadow-md max-w-md"
      >
        <label className="block mb-2">
          Nome:
          <input
            type="text"
            name="name"
            defaultValue={initialData.name}
            //   onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            defaultValue={initialData.email}
            //   onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        {"age" in initialData && (
          <label className="block mb-2">
            Idade:
            <input
              type="number"
              name="age"
              defaultValue={initialData.age || ""}
              // onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
        )}
        {"specialization" in initialData && (
          <label className="block mb-2">
            Especialização:
            <input
              type="text"
              name="specialization"
              defaultValue={initialData.specialization || ""}
              // onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
        )}
        <div className="flex gap-2">
          <Link
            href={`/${userRole}/profile/`}
            className="bg-red-500 text-white p-2 rounded mt-4"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
