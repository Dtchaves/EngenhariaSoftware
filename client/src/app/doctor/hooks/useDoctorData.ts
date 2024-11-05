// app/doctor/hooks/useDoctorData.ts

import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { DoctorData } from "@/app/shared/utils";

export const useDoctorData = () => {
  const [data, setData] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get<DoctorData>(`${apiUrl}/api/doctor/profile`, {
          withCredentials: true,
        });
        console.log("response: ", response.data);
        setData(response.data);
        console.log("data: ", data);
      } catch (err) {
        console.error("Erro ao buscar dados do médico:", err);
        setError("Erro ao buscar dados do médico");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  return { data, loading, error, setError };
};
