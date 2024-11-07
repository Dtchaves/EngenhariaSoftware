import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { redirect } from "next/navigation";

export async function deletePatientProfile() {
        try {
            await axios.delete(
                `${apiUrl}/api/patient/profile`,
                { withCredentials: true }
            );
        } catch (err) {
            console.error("Erro ao deletar perfil do médico:", err);
        } finally {
            console.log("Perfil do médico deletado com sucesso");
            redirect("/login");
        }
};
