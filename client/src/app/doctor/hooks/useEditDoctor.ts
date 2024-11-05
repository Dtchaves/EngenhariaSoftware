"use client"
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { DoctorData, EditDoctorData } from "@/app/shared/utils";

export default async function useEditDoctor(doctorData: EditDoctorData, setError: (error: string) => void) {
    try {
        console.log("doctorData: ", doctorData);
        await axios.put<DoctorData>(
            `${apiUrl}/api/doctor/profile`,
            doctorData,
            {
                withCredentials: true,
            }
        );
    } catch (err) {
        console.error("Erro ao editar dados do médico:", err);
        setError("Erro ao editar dados do médico");
    } finally {
        console.log("Dados do médico editados com sucesso");
        window.location.reload();
    }
};
