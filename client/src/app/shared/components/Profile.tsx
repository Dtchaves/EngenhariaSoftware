// app/shared/components/Profile.tsx

import { DoctorData, PatientData } from "@/app/shared/utils";
import ActionButtons from "./ActionButtons";

interface ProfileProps {
  data: DoctorData | PatientData;
  userRole: "doctor" | "patient";
  isEditable: boolean;
}

export default function Profile({ data, userRole, isEditable }: ProfileProps) {
  const title = userRole === "doctor" ? "Perfil do Médico" : "Perfil do Paciente";
  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex flex-col gap-3">
          <p className="w-full max-w-xs">
            <strong>Nome:</strong> {data.name}
          </p>
          <p className="w-full max-w-xs">
            <strong>Email:</strong> {data.email}
          </p>
          {'age' in data && (
            <p className="w-full max-w-xs">
              <strong>Idade:</strong> {data.age}
            </p>
          )}
          {'crm' in data && (
            <p className="w-full max-w-xs">
              <strong>Idade:</strong> {data.crm}
            </p>
          )}
          {'specialization' in data && (
            <p className="w-full max-w-xs">
              <strong>Especialidade:</strong> {data.specialization}
            </p>
          )}
          {isEditable && <ActionButtons userRole={userRole} />}
        </div>
      </div>
    </div>
  );
}
