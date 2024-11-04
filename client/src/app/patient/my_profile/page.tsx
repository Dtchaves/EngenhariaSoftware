// app/medico/my_profile/page.tsx
"use client";

import PatientProfile from "../components/PatientProfile";

export default function PatientProfilePage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <PatientProfile/>
        </main>
      </div>
    </div>
  );
}
