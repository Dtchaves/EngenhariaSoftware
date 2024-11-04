// app/medico/hooks/usePatientData.ts
import { useState, useEffect } from "react";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
}

export const usePatientData = () => {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de chamada para obter dados dos pacientes
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/patients"); // Substitua pela rota real da API
        const patients = await response.json();
        setData(patients);
      } catch (error) {
        console.error("Erro ao carregar dados dos pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return { data, loading };
};
