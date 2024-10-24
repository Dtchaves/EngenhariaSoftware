import React, { useState } from 'react';
import axios from 'axios';

function UploadExam() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`http://localhost:5000/patients/${patientId}/upload_exam`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`Upload successful! Prediction: ${response.data.prediction}`);
    } catch (error) {
      console.error('Error uploading file', error);
      setMessage('Error uploading file');
    }
  };

  return (
    <div>
      <h2>Upload Exam</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadExam;
