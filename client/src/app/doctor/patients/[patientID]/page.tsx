// app/medico/patients/[patientID]/page.tsx
import { useRouter } from "next/router";
import ExamTable from "../../components/ExamTable";

const PatientExamsPage = () => {
  const router = useRouter();
  const { patientID } = router.query;

  // Exemplo de dados de exames
  const exams = [
    { id: "1", date: "2024-11-01", description: "ECG - 01 Nov" },
    { id: "2", date: "2024-10-25", description: "ECG - 25 Oct" },
  ];

  return (
    <div>
      <h1>Exames do Paciente {patientID}</h1>
      <ExamTable patientId={patientID as string} exams={exams} />
    </div>
  );
};

export default PatientExamsPage;
