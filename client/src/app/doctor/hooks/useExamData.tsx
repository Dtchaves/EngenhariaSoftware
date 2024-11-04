// app/medico/hooks/useExamData.ts
import { useState, useEffect } from "react";

interface Exam {
  id: string;
  date: string;
  type: string;
}

export const useExamData = (patientId: string) => {
  const [data, setData] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    const fetchExams = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/patients/${patientId}/exams`); // Substitua pela rota real da API
        const exams = await response.json();
        setData(exams);
      } catch (error) {
        console.error("Erro ao carregar dados dos exames:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [patientId]);

  return { data, loading };
};
