"use client";
import { apiUrl } from "@/app/shared/constants";
import { PatientsExamsRowData } from "@/app/shared/utils";
import axios from "axios";
import { useState, useEffect } from "react";

export function usePatientData() {
  const [data, setData] = useState<PatientsExamsRowData[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/doctor/patients`, {
          withCredentials: true,
        }); // Substitua pela rota real da API
        const patients = await response.data;
        console.log("patients: ", patients);
        setData(patients);
        if(response.data.message){
          setMessage("Erro ao buscar dados dos pacientes: " + response.data.message);
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos pacientes:", error);
        setMessage(
          "Erro ao buscar dados do paciente. Verifique sua conexão ou tente novamente."
        );
      }
    };
    // Simulação de chamada para obter dados dos pacientes

    fetchPatients();
  }, []);

  return { data, message };
};
