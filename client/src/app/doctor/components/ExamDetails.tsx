// app/medico/components/ExamDetail.tsx
import { useState } from "react";

interface ExamDetailProps {
  patientId: string;
  examId: string;
}

const ExamDetail: React.FC<ExamDetailProps> = ({ patientId, examId }) => {
  const [classification, setClassification] = useState<string | null>(null);

  const handleViewExam = () => {
    // Lógica para visualizar o exame
  };

  const handleClassifyExam = async () => {
    // Lógica para classificar o exame
    const response = await fetch(`/api/patients/${patientId}/exams/${examId}/classify`, {
      method: "POST",
    });
    const result = await response.json();
    setClassification(result.classification);
  };

  const handleSendFeedback = () => {
    // Lógica para enviar feedback ao paciente
  };

  return (
    <div>
      <h2>Detalhes do Exame</h2>
      <p>ID do Paciente: {patientId}</p>
      <p>ID do Exame: {examId}</p>

      <div className="flex space-x-4 mt-4">
        <button onClick={handleViewExam} className="btn">Ver Exame</button>
        <button onClick={handleClassifyExam} className="btn">Classificar Exame</button>
        <button onClick={handleSendFeedback} className="btn">Enviar Feedback</button>
      </div>

      {classification && <p>Classificação: {classification}</p>}
    </div>
  );
};

export default ExamDetail;
