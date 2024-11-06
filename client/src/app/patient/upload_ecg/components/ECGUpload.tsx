"use client";
import React, { useState, ChangeEvent } from "react";
import { ECGUpload } from "../lib/use-ecg-upload";

export default function ECGUploader() {
  // State to hold the selected file
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploadStatus("Uploading...");
    const { message } = await ECGUpload(formData);
    setError(message);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>File Uploader</h2>
      {error && (
        <div className="bg-red-500 text-white p-4 text-center">{error}</div>
      )}
      <input type="file" onChange={handleFileChange} />
      {file && <p>Selected file: {file.name}</p>}
      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Upload File
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
