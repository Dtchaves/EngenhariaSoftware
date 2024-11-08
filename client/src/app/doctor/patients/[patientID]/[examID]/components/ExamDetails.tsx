// ExamDetail.tsx

"use client";
import { DoctorExam, PatientExam } from "@/app/shared/utils";
import { useState } from "react";

interface ExamDetailProps {
  data: DoctorExam;
}

export default function ExamDetail({ data }: ExamDetailProps) {
  const [showExam, setShowExam] = useState<boolean>(false);
  const [showClassification, setShowClassification] = useState<boolean>(false);

  const handleViewExam = () => {
    setShowExam(true);
  };

  const handleClassifyExam = async () => {
    setShowClassification(true);
  };

  const handleSendFeedback = () => {
    // Lógica para enviar feedback ao paciente
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Detalhes do Exame - {data.exam_name}
      </h2>
      <p className="text-gray-600">
        <strong>Paciente:</strong> {data.patient_name}
      </p>

      <div className="space-y-4 mt-6">
        {/* Botão para visualizar o exame */}
        <button
          onClick={handleViewExam}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
        >
          Ver Exame
        </button>

        {/* Exibe a imagem do exame e o botão de classificação abaixo */}
        {showExam && (
          <div className="space-y-4">
            {data.ecg_image_base64 && (
              <div className="flex justify-center">
                <img
                  src={`data:image/png;base64,${data.ecg_image_base64}`}
                  alt={`ECG ${data.exam_name}`}
                  className="rounded-md object-contain shadow-md"
                  style={{ maxHeight: "500px", maxWidth: "100%" }} // Aumentado para 500px
                />
              </div>
            )}

            <button
              onClick={handleClassifyExam}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full"
            >
              Ver classificação do exame
            </button>
          </div>
        )}

        {/* Exibe a classificação e o feedback do exame */}
        {showClassification && (
          <div className="space-y-6 mt-6">
            <table className="table-auto border-collapse w-full bg-gray-50 shadow-md rounded-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Doença</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Probabilidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.result_json).map((disease) => (
                  <tr key={disease} className="hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {disease}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                        {data.result_json[disease].probability.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="my-6 flex justify-center">
              <img
                src={`data:image/png;base64,${data.model_result_image_base64}`}
                alt={`Classificação - Gráfico - ${data.exam_name}`}
                className="rounded-md object-contain shadow-md"
                style={{ maxHeight: "400px", maxWidth: "100%" }}
              />
            </div>

            <div className="mt-4 space-y-4">
              <textarea
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Escreva seu feedback aqui..."
              ></textarea>
              <button
                onClick={handleSendFeedback}
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition w-full"
              >
                Enviar Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
