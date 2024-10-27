import unittest
from unittest.mock import patch
from server.app import create_app, db
from api.models import Doctor, Patient, Admin, Message, ExamResult
from flask import url_for
from io import BytesIO
import os

class TestApp(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app()
        cls.app.config['TESTING'] = True
        cls.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        cls.client = cls.app.test_client()
        cls.ctx = cls.app.app_context()
        cls.ctx.push()
        db.create_all()

        # Prepopulate database with admin, doctor, and patient
        cls.admin = Admin(username="admin")
        cls.admin.set_password("admin_pass")
        db.session.add(cls.admin)

        cls.doctor = Doctor(name="Dr. Test", crm="12345", specialization="Cardiology")
        cls.doctor.set_password("doc_pass")
        db.session.add(cls.doctor)

        cls.patient = Patient(name="John Doe", age=30, email="john@example.com", doctor_id=cls.doctor.id)
        cls.patient.set_password("patient_pass")
        db.session.add(cls.patient)

        db.session.commit()

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.drop_all()
        cls.ctx.pop()

    # Authentication, CRUD, and Message tests (omitted for brevity)...

    # Exam Upload and Model Prediction Test
    @patch('app.routes.predict')  # Mock the 'predict' function from routes
    def test_upload_exam_with_prediction(self, mock_predict):
        # Mock response from the model's predict function
        mock_predict.return_value = {"diagnosis": "Normal", "confidence": 0.95}

        # Use an example exam image from the folder
        with open('example_exam.jpg', 'rb') as img_file:
            data = {
                'file': (BytesIO(img_file.read()), 'example_exam.jpg')
            }
            # Send request to upload exam
            response = self.client.post(f'/patients/{self.patient.id}/upload_exam', 
                                        content_type='multipart/form-data', 
                                        data=data)
            
            self.assertEqual(response.status_code, 200)
            
            # Check if the mock was called and model prediction returned the expected result
            mock_predict.assert_called_once()
            self.assertIn('diagnosis', response.json)
            self.assertIn('confidence', response.json)
            self.assertEqual(response.json['diagnosis'], 'Normal')
            self.assertEqual(response.json['confidence'], 0.95)

if __name__ == '__main__':
    unittest.main()
