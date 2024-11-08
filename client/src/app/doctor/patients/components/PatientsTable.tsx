// app/medico/components/PatientTable.tsx
import React from "react";
import Link from "next/link";
import { usePatientData } from "../lib/get-patients-table-data";

export default function PatientsTable() {
  const { data, message } = usePatientData();

  if (message !== "")
    return (
      <p className="text-red-500 font-semibold text-center my-4">{message}</p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nome</th>
            <th className="py-3 px-6 text-left">Idade</th>
            <th className="py-3 px-6 text-left">Email</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {data.map((patient) => (
            <tr
              key={patient.id}
              className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <Link
                  href={`/doctor/patients/${patient.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {patient.name}
                </Link>
              </td>
              <td className="py-3 px-6 text-left">{patient.age}</td>
              <td className="py-3 px-6 text-left">{patient.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
