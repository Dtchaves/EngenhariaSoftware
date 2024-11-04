// app/medico/hooks/useClassification.ts
import { useState } from "react";

export const useClassification = () => {
  const [classificationResult, setClassificationResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const classifyExam = async (patientId: string, examId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/patients/${patientId}/exams/${examId}/classify`, {
        method: "POST",
      }); // Substitua pela rota real da API

      const result = await response.json();
      setClassificationResult(result.classification); // Ajuste conforme o formato de resposta da sua API
    } catch (error) {
      console.error("Erro ao classificar exame:", error);
    } finally {
      setLoading(false);
    }
  };

  return { classifyExam, classificationResult, loading };
};
