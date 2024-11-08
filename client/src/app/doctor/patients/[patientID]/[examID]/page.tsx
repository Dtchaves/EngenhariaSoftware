import { isErrorResponse } from "@/app/shared/utils";
import ExamDetail from "./components/ExamDetails";
import SendExamResult from "../../../components/SendExamResult";
import { getPatientExam } from "./lib/get-patient-exam";

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ patientID: number, examID: number }>
}) {
  const { patientID, examID } = await params;

  const data = await getPatientExam(patientID, examID);

  if (isErrorResponse(data)) {
    return (
      <div className="bg-red-500 text-white p-4 text-center">
        {data.message}
      </div>
    );
  }
  
  return (
    <div>
      <ExamDetail data={data} />
      {/* <SendExamResult patientId={patientID as unknown as string} examId={examID as unknown as string} doctorEmail="doctor@example.com" /> */}
    </div>
  );
};