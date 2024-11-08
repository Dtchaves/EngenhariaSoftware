// app/doctor/my_profile/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoctorPage() {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [])
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          {/* <GeneralInfo /> */}
        </main>
      </div>
    </div>
  );
}
