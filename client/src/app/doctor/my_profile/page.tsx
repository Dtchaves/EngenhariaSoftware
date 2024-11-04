// app/medico/my_profile/page.tsx
"use client";

import DoctorProfile from "../components/DoctorProfile";

export default function DoctorProfilePage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <DoctorProfile />
        </main>
      </div>
    </div>
  );
}
