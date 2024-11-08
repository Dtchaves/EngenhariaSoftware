import { isErrorResponse } from "@/app/shared/utils";
import PatientExamsTable from "../../../shared/components/PatientExamsTable";
import PatientDoctorProfile from "./components/PatientDoctorProfile";
import { getPatientDataAndExams } from "./hooks/getPatientDataAndExams";

export default async function PatientDoctorPage({
  params,
}: {
  params: Promise<{ patientID: number }>
}) {
  const patientID = (await params).patientID;

  const data = await getPatientDataAndExams(patientID);
  
  if (isErrorResponse(data)) {
    return <div className="bg-red-500 text-white p-4 text-center">{data.message}</div>;
  }

  return (
    <div>
      <PatientDoctorProfile patientData={data.patient} />
      <PatientExamsTable exams={data.exams} context="doctor"/>
    </div>
  );
}