"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// import React, { useState } from "react";
// import GeneralInfo from "./components/generalInfo";
// import DoctorProfile from "./components/doctorProfile";

export default function PatientPage() {
  // const [view, setView] = useState<"general" | "profile">("general");
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [])
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          {/* {view === "general" ? <GeneralInfo /> : <DoctorProfile />} */}
        </main>
      </div>
    </div>
  );
}
