"use client";

// import React, { useState } from "react";
// import GeneralInfo from "./components/generalInfo";
// import DoctorProfile from "./components/doctorProfile";

export default function DoctorPage() {
  // const [view, setView] = useState<"general" | "profile">("general");

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          {/* {view === "general" ? <GeneralInfo /> : <DoctorProfile />} */}
          
          {/* Sobre nós */}
          <section className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Sobre Nós</h2>
            <p className="text-lg">
              Somos uma equipe dedicada de profissionais da saúde, comprometidos com o bem-estar e o cuidado de nossos pacientes. Com anos de experiência e uma abordagem centrada no paciente, buscamos proporcionar tratamentos de excelência e atendimento humanizado.
            </p>
            <p className="mt-4 text-lg">
              Nossa missão é oferecer cuidados médicos de qualidade, utilizando as melhores práticas e tecnologias, sempre com respeito e empatia.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
