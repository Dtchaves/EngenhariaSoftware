// app/doctor/my_profile/page.tsx
"use client";

import GeneralInfo from "./components/generalInfo";

export default function DoctorPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <GeneralInfo />
        </main>
      </div>
    </div>
  );
}
