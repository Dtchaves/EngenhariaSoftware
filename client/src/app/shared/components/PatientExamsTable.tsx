import React from "react";
import Link from "next/link";
import { ExamResultResponse, PatientExam } from "@/app/shared/utils";

interface PatientExamsTableProps {
  exams: ExamResultResponse[] | PatientExam[];
  context: "doctor" | "patient";
}

export default function PatientExamsTable({
  exams,
  context,
}: PatientExamsTableProps) {
  const lastColumn = context === "doctor" ? "Paciente" : "Médico";
  const bgColor = context === "doctor" ? "bg-blue-600" : "bg-red-600";
  const linkColor = context === "doctor" ? "text-blue-500" : "text-red-500";
  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">Exames</h1>
      <table className="items-center min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className={`${bgColor} text-white uppercase text-sm leading-normal`}>
            <th className="py-3 px-6 text-left">Nome do exame</th>
            <th className="py-3 px-6 text-left">Data</th>
            <th className="py-3 px-6 text-left">{lastColumn}</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {exams.map((exam) => (
            <tr
              key={exam.id}
              className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <Link
                  href={
                    context === "doctor"
                      ? `/doctor/patients/${
                          (exam as ExamResultResponse).patient_id
                        }/${exam.id}`
                      : `/patient/exams/${exam.id}`
                  }
                  className={`${linkColor} hover:underline`}
                >
                  {exam.exam_name}
                </Link>
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(exam.created_at).toLocaleDateString()}
              </td>
              {context === "doctor" && (
                <td className="py-3 px-6 text-left">
                  {(exam as ExamResultResponse).patient_name}
                </td>
              )}
              {context === "patient" && (
                <td className="py-3 px-6 text-left">
                  {(exam as PatientExam).doctor_name}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}