'use client'
// app/medico/hooks/usePatientData.ts
import { apiUrl } from "@/app/shared/constants";
import axios from "axios";
import { useState, useEffect } from "react";

interface Patient {
  id: string;
  name: string;
  // exam: ...
}

export const usePatientData = () => {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/doctor/patients`, { withCredentials: true}); // Substitua pela rota real da API
      const patients = await response.data;
      // Now, every patient has an id, a name and an array of exams. We are going to transform that so that each element of the array correspond to a exam.
      // patients = patients.map((patient: any) => {
      //   return {
      //     id: patient.id,
      //     name: patient.name,
      //     exams: patient.exams.map((exam: any) => {
      //       return {
      //         id: exam.id,
      //         name: exam.name,
      //         result: exam.result,
      //       };
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
