import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads/")
    ALLOWED_EXTENSIONS = os.getenv("ALLOWED_EXTENSIONS", "jpg,jpeg,png,pdf").split(',')
    MODEL_PATH = os.getenv("MODEL_PATH")
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    PORT = int(os.getenv('PORT', 4000))
