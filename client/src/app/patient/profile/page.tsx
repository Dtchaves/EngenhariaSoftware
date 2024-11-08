// app/medico/my_profile/page.tsx
import React, { Suspense } from 'react';
import { getPatientProfile } from '../../shared/hooks/get-patient-profile';
import Profile from '../../shared/components/Profile';

export default async function PatientProfilePage() {
  const data = await getPatientProfile();
  if ('message' in data) {
    return <div>{data.message}</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <Suspense fallback={<div>Carregando...</div>}>
            <Profile data={data} userRole='patient' isEditable={true} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
