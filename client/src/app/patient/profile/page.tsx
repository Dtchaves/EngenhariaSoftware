// app/medico/my_profile/page.tsx
import React, { Suspense } from 'react';
import PatientProfile from './components/PatientProfile';

export default function PatientProfilePage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <Suspense fallback={<div>Carregando...</div>}>
            <PatientProfile/>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
