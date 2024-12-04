'use client'

import React from "react";
import { getPatientProfile } from "../hooks/getPatientProfile";
import ActionButtons from "./ActionButtons";

export default async function PatientProfile() {
  const data = await getPatientProfile();

  if (!data) return <p>Erro ao buscar dados do paciente</p>;

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
            
            <div className="flex flex-col gap-3">
              <p><strong>Nome:</strong> {data?.name}</p>
              <p><strong>Email:</strong> {data?.email}</p>
              <p><strong>Idade:</strong> {data?.age}</p>
              <ActionButtons />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
