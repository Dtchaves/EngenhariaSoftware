import unittest
from app import create_app, db
from app.models import Doctor, Patient, Admin, Message, ExamResult
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

        # Prepopulate database with an admin, doctor, and patient
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

    # Authentication Tests
    def test_admin_login(self):
        response = self.client.post('/login/admin', json={'username': 'admin', 'password': 'admin_pass'})
        self.assertEqual(response.status_code, 200)

    def test_doctor_login(self):
        response = self.client.post('/login', json={'crm': '12345', 'password': 'doc_pass'})
        self.assertEqual(response.status_code, 200)

    def test_patient_login(self):
        response = self.client.post('/login', json={'email': 'john@example.com', 'password': 'patient_pass'})
        self.assertEqual(response.status_code, 200)

    # Doctor CRUD tests
    def test_create_doctor(self):
        response = self.client.post('/doctors', json={
            'name': 'Dr. New',
            'specialization': 'Neurology',
            'crm': '54321'
        })
        self.assertEqual(response.status_code, 200)

    def test_get_doctors(self):
        response = self.client.get('/doctors')
        self.assertEqual(response.status_code, 200)

    def test_get_doctor_by_id(self):
        response = self.client.get(f'/doctors/{self.doctor.id}')
        self.assertEqual(response.status_code, 200)

    def test_update_doctor(self):
        response = self.client.put(f'/doctors/{self.doctor.id}', json={
            'name': 'Dr. Updated',
            'specialization': 'Cardiology',
            'crm': '12345'
        })
        self.assertEqual(response.status_code, 200)

    def test_delete_doctor(self):
        new_doctor = Doctor(name="Dr. To Delete", crm="99999", specialization="General")
        db.session.add(new_doctor)
        db.session.commit()

        response = self.client.delete(f'/doctors/{new_doctor.id}')
        self.assertEqual(response.status_code, 200)

    # Patient CRUD tests
    def test_create_patient(self):
        response = self.client.post('/patients', json={
            'name': 'Jane Doe',
            'age': 28,
            'email': 'jane@example.com',
            'doctor_id': self.doctor.id
        })
        self.assertEqual(response.status_code, 200)

    def test_get_patients(self):
        response = self.client.get('/patients')
        self.assertEqual(response.status_code, 200)

    def test_get_patient_by_id(self):
        response = self.client.get(f'/patients/{self.patient.id}')
        self.assertEqual(response.status_code, 200)

    def test_update_patient(self):
        response = self.client.put(f'/patients/{self.patient.id}', json={
            'name': 'John Doe Updated',
            'age': 30,
            'email': 'john@example.com',
            'doctor_id': self.doctor.id
        })
        self.assertEqual(response.status_code, 200)

    def test_delete_patient(self):
        new_patient = Patient(name="To Delete", email="delete@example.com", age=40, doctor_id=self.doctor.id)
        db.session.add(new_patient)
        db.session.commit()

        response = self.client.delete(f'/patients/{new_patient.id}')
        self.assertEqual(response.status_code, 200)

    # Message Tests
    def test_send_message(self):
        response = self.client.post('/messages', json={
            'receiver_id': self.doctor.id,
            'content': 'Hello Doctor!'
        })
        self.assertEqual(response.status_code, 200)

    def test_get_messages(self):
        response = self.client.get(f'/messages/{self.doctor.id}')
        self.assertEqual(response.status_code, 200)

    # Exam Upload and Model Prediction Test
    def test_upload_exam(self):
        # Use an example exam image from the folder
        with open('example_exam.jpg', 'rb') as img_file:
            data = {
                'file': (BytesIO(img_file.read()), 'example_exam.jpg')
            }
            response = self.client.post(f'/patients/{self.patient.id}/upload_exam', content_type='multipart/form-data', data=data)
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
