
import React from "react";
import { useDoctorProfile } from "../hooks/useDoctorProfile";
import DoctorProfileEditor from "./DoctorProfileEditor";
import { EditDoctorData } from "@/app/shared/utils";
import useDeleteDoctorProfile from "../hooks/useDeleteDoctorProfile";

const DoctorProfile = () => {
  const { data, loading, error, setError } = useDoctorProfile();
  const [isEditing, setIsEditing] = React.useState(false);
  const initialData: EditDoctorData = {
    name: data?.name ?? "",
    email: data?.email ?? "",
    specialization: data?.specialization ?? "",
  };

  const deleteDoctorProfile = useDeleteDoctorProfile();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);
  const handleDeleteClick = () => {
    if (window.confirm("Tem certeza que deseja deletar seu perfil?")) {
      deleteDoctorProfile(setError);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Imagem de fundo com desfoque */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: "url('/image.jpg')", // Caminho para a imagem de fundo
          zIndex: -1,
        }}
      ></div>

      <div className="flex h-screen bg-gray-50 bg-opacity-50"> {/* Transparência sobreposta */}
        <div className="flex-1 flex flex-col p-8">
          <main className="bg-white rounded-lg shadow-lg p-8 space-y-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Meu Perfil</h2>
            
            {isEditing ? (
              <DoctorProfileEditor
                initialData={initialData}
                onCancel={handleCancelClick}
                setIsEditing={setIsEditing}
                setError={setError}
              />
            ) : (
              <div>
                <p>
                  <strong>Nome:</strong> {data?.name}
                </p>
                <p>
                  <strong>Email:</strong> {data?.email}
                </p>
                <p>
                  <strong>Especialidade:</strong> {data?.specialization}
                </p>
                <p>
                  <strong>CRM:</strong> {data?.crm}
                </p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Apagar perfil
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
