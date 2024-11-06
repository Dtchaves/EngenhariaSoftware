import os
import torch
from werkzeug.utils import secure_filename

def save_file(file, upload_folder):
    """Saves a file and returns the saved filepath"""
    if not file:
        return None

    filename = secure_filename(file.filename)
    filepath = os.path.join(upload_folder, filename)
    file.save(filepath)
    return filepath

def allowed_file(filename, allowed_extensions):
    """Checks if the file has an allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def load_model(model_path):
    """Loads the PyTorch model for inference"""
    #model = torch.load(model_path, map_location=torch.device('cpu'))
    return None

def make_prediction(model, image_tensor):
    """Runs the prediction on an image tensor using the model"""
    with torch.no_grad():
        output = model(image_tensor)
        return output
