// app/medico/components/PatientTable.tsx
'use client';
import React from "react";
import Link from "next/link";
import { usePatientData } from "../hooks/usePatientData";

const PatientTable = () => {
  const { data, loading } = usePatientData();

  if (loading) return <p>Carregando...</p>;

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Nome</th>
          <th className="py-2">Idade</th>
          <th className="py-2">Última Consulta</th>
        </tr>
      </thead>
      <tbody>
        {data.map((patient) => (
          <tr key={patient.id} className="hover:bg-gray-200">
            <td className="py-2 px-4">
              <Link href={`/medico/patients/${patient.id}`}>{patient.name}</Link>
            </td>
            {/* <td className="py-2 px-4">{patient.age}</td>
            <td className="py-2 px-4">{patient.lastVisit}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;
