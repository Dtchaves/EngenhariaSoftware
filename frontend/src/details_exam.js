import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamDetails({ patientId }) {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function fetchExams() {
      const response = await axios.get(`http://localhost:5000/doctor/patient/${patientId}/exams`);
      setExams(response.data);
    }
    fetchExams();
  }, [patientId]);

  return (
    <div>
      <h2>Exam Details for Patient {patientId}</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>
            <strong>Prediction:</strong> {exam.result.prediction}
            <br />
            <strong>Date:</strong> {new Date(exam.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamDetails;
