import os
import torch
from werkzeug.utils import secure_filename

def save_file(file, upload_folder, name: str):
    """Saves a file and returns the saved filepath"""
    if not file:
        return None

    filepath = os.path.join(upload_folder, f"{name}.csv")
    file.save(filepath)
    return filepath

def allowed_file(filename, allowed_extensions):
    """Checks if the file has an allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def load_model(model_path):
    """Loads the PyTorch model for inference"""
    model = torch.load(model_path, map_location=torch.device('cpu'))
    return model

def make_prediction(model, image_tensor):
    array = [1e-05, 1e-05, 1e-05, 1e-05, 1e-05, 1e-05]

    """Runs the prediction on an image tensor using the model"""
    with torch.no_grad():
        output = model(image_tensor)
        probs = torch.sigmoid(output)

        binary_results = torch.zeros_like(probs)
        for i in range(len(array)):
            binary_results[:, i] = (
                probs[:, i] >= array[i]
            ).float()
            
        print(binary_results)
        return binary_results.detach().numpy().flatten()
