import ECGUploader from "./components/ECGUpload";

export default function UploadECGPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <ECGUploader />
        </main>
      </div>
    </div>
  );
}
