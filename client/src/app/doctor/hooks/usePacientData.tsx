'use client'
// app/medico/hooks/usePatientData.ts
import { apiUrl } from "@/app/shared/constants";
import axios from "axios";
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

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/doctors/patients`, { withCredentials: true}); // Substitua pela rota real da API
      const patients = await response.data;
      console.log("patients: ", patients);
      setData(patients);
    } catch (error) {
      console.error("Erro ao carregar dados dos pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulação de chamada para obter dados dos pacientes

    fetchPatients();
  }, []);

  return { data, loading };
};
