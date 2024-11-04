'use client'
import React, { useState, ChangeEvent } from 'react';
import { ECGUpload } from '../hooks/use-ecg-upload';

export default function FileUploader() {
    // State to hold the selected file
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    // Handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            setUploadStatus('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploadStatus('Uploading...');
        ECGUpload(formData);
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>File Uploader</h2>
            <input
                type="file"
                onChange={handleFileChange}
            />
            {file && <p>Selected file: {file.name}</p>}
            <button onClick={handleUpload} style={{ marginTop: '10px' }}>
                Upload File
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};