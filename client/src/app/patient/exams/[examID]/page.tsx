import { isErrorResponse } from "@/app/shared/utils";
import { getExam } from "./lib/get-exam";

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ examID: number }>
}) {
  const { examID } = await params;

  const data = await getExam(examID);

  if (isErrorResponse(data)) {
    return (
      <div className="bg-red-500 text-white p-4 text-center">
        {data.message}
      </div>
    );
  }

  const exam = data;

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">ECG - {examID} </h1>
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden border max-w-lg w-full">
        <div className="p-4 w-full text-center">
          <h2 className="text-xl font-semibold mb-2">{exam.exam_name}</h2>
          <p className="text-gray-700 mb-1">
            <strong>Data:</strong> {new Date(exam.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Médico:</strong> {exam.doctor_name} ({exam.doctor_email})
          </p>
          {exam.doctor_feedback && (
            <p className="text-gray-700 mb-2">
              <strong>Feedback:</strong> {exam.doctor_feedback}
            </p>
          )}
          {exam.ecg_image_base64 && (
            <div className="my-3 flex justify-center">
              <img
                src={`data:image/png;base64,${exam.ecg_image_base64}`}
                alt={`ECG ${exam.exam_name}`}
                className="rounded-md object-contain"
                style={{ maxHeight: "400px", maxWidth: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
