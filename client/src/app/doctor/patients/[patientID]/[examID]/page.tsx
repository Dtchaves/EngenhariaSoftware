import ExamDetail from "../../../components/ExamDetails";
import SendExamResult from "../../../components/SendExamResult";

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ patientID: number, examID: number }>
}) {
  const { patientID, examID } = await params;
  return (
    <div>
      <h1>Detalhes do Exame</h1>
      {/* <ExamDetail patientId={patientID} examId={examID} /> */}
      <SendExamResult patientId={patientID as unknown as string} examId={examID as unknown as string} doctorEmail="doctor@example.com" />
    </div>
  );
};