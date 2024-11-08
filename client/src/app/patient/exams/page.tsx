import { isErrorResponse } from "@/app/shared/utils";
import { getPatientExams } from "./lib/get-patient-exams";
import PatientExamsTable from "@/app/shared/components/PatientExamsTable";

export default async function PatientExamsPage() {
  const data = await getPatientExams();

  if (isErrorResponse(data)) {
    return (
      <div className="bg-red-500 text-white p-4 text-center">
        {data.message}
      </div>
    );
  }

  return (
    <PatientExamsTable exams={data} context="patient" />
  );
}
