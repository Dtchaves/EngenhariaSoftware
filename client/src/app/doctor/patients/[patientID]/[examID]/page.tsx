// app/medico/patients/[patientID]/[examID]/page.tsx
import { useRouter } from "next/router";
import ExamDetail from "../../../components/ExamDetails";

const ExamDetailPage = () => {
  const router = useRouter();
  const { patientID, examID } = router.query;

  return (
    <div>
      <h1>Detalhes do Exame</h1>
      <ExamDetail patientId={patientID as string} examId={examID as string} />
    </div>
  );
};

export default ExamDetailPage;
