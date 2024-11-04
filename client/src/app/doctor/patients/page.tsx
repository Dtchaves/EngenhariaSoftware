// app/medico/patients/page.tsx
"use client";

import PatientTable from "../components/PatientTable";

export default function PatientListPage() {
  return (
    <div className="flex h-screen">
      <main className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4">Lista de Pacientes</h2>
        <PatientTable />
      </main>
    </div>
  );
}
