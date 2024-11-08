import Profile from "@/app/shared/components/Profile";
import { getDoctorProfile } from "@/app/shared/hooks/get-doctor-profile";
import { isErrorResponse } from "@/app/shared/utils";
import { getDoctorDataForPatient } from "./lib/get-doctor-data-for-patient";

export default async function DoctorProfileForPatientPage() {
  const data = await getDoctorDataForPatient();

  if (isErrorResponse(data)) {
    return <div className="bg-red-500 text-white p-4 text-center">{data.message}</div>;
  }

  return (
    <Profile 
      data={data} 
      userRole="doctor"
      isEditable={false} 
    />
  );
}
