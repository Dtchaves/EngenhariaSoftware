// app/paciente/components/MyProfile.tsx

import { getPatientProfile } from "../hooks/get-patient-profile";
import ActionButtons from "./ActionButtons";

export default async function PatientProfile() {
  // const getPatientProfile = useGetPatientProfile();
  const data = await getPatientProfile();

  if (!data) return <p>Erro ao buscar dados do paciente</p>;

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">Perfil do Paciente</h2>
      <div className="flex flex-col gap-3">
          <p className="w-full max-w-xs"><strong>Nome:</strong> {data?.name}</p>
          <p className="w-full max-w-xs"><strong>Email:</strong> {data?.email}</p>
          <p className="w-full max-w-xs"><strong>Idade:</strong> {data?.age}</p>
          <ActionButtons />
      </div>
      </div>
    </div>
  );
};
