// app/medico/my_profile/page.tsx
import Profile from '@/app/shared/components/Profile';
import { getDoctorProfile } from '@/app/shared/hooks/get-doctor-profile';

import React, { Suspense } from 'react';

export default async function DoctorProfilePage() {
  const data = await getDoctorProfile();
  if ('message' in data) {
    return <div>{data.message}</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <Suspense fallback={<div>Carregando...</div>}>
            <Profile data={data} userRole='doctor' isEditable={true} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
