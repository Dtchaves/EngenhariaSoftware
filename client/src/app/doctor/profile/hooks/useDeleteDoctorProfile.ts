import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { redirect } from "next/navigation";

export default function useDeleteDoctorProfile() {
    return async (setError: (error: string) => void) => {
        try {
            await axios.delete(
                `${apiUrl}/api/doctor/profile`,
                { withCredentials: true }
            );
        } catch (err) {
            console.error("Erro ao deletar perfil do médico:", err);
            setError("Erro ao deletar perfil do médico");
        } finally {
            console.log("Perfil do médico deletado com sucesso");
            redirect("/login");
        }
    };
};
