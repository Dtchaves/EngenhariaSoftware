// app/paciente/hooks/usePatientData.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";

interface PatientData {
  name: string;
  email: string;
  age: number;
  doctor_id: string;
}

export const usePatientData = (patientId: string) => {
  const [data, setData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/patients/${patientId}`, {
          withCredentials: true,
        });
        setData(response.data); // Dados esperados na estrutura PatientData
      } catch (err) {
        console.error("Erro ao buscar dados do paciente:", err);
        setError("Erro ao buscar dados do paciente");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  return { data, loading, error };
};
