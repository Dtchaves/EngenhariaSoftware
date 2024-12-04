import { PatientData } from "@/app/shared/utils";

interface PatientDoctorProfileProps {
  patientData: PatientData;
}
export default function PatientDoctorProfile({
  patientData,
}: PatientDoctorProfileProps) {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Perfil do Paciente</h2>
        <div className="flex flex-col gap-3">
          <p className="w-full max-w-xs">
            <strong>Nome:</strong> {patientData.name}
          </p>
          <p className="w-full max-w-xs">
            <strong>Email:</strong> {patientData.email}
          </p>
          <p className="w-full max-w-xs">
            <strong>Idade:</strong> {patientData.age}
          </p>
        </div>
      </div>
    </div>
  );
}