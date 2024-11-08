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

def load_model(model_path, device):
    """Loads the PyTorch model for inference"""
    model = torch.load(model_path, map_location=device)
    return model

def make_prediction(model, image_tensor, plot_path):

    """Runs the prediction on an image tensor using the model"""
    import matplotlib.pyplot as plt
    
    logits = model(image_tensor)
    
    probabilities = torch.sigmoid(logits)

    diseases = ["1dAVb", "RBBB ", "LBBB", "SB", "AF ", "ST"]

    thresholds = [0.24, 0.47, 0.14, 0.22, 0.31, 0.15]

    predicted_binary = []
    for class_idx in range(6):
        binary_classification = (probabilities[:, class_idx] >= thresholds[class_idx]).float()
        predicted_binary.append(binary_classification.item())  
        
    plt.figure(figsize=(8, 6))
    plt.bar(diseases, probabilities[0].detach().numpy(), color="skyblue")
    for i, thr in enumerate(thresholds):
        plt.axhline(thr, color="orange", linestyle="--", xmin=i/6, xmax=(i+1)/6, label=f"Limiar {diseases[i]}")

    plt.tight_layout(rect=[0, 0.05, 1, 0.98])  # Ajusta o layout para evitar sobreposição
    plt.ylabel("Probabilidade")
    plt.title("Probabilidade de Cada Doença com Classificação")
    plt.ylim(0, 1)
    plt.legend(loc="upper right")
    plt.savefig(plot_path, dpi=300)
    
    result = {}
    for i, disease in enumerate(diseases):
        result[disease] = {
            "probability": probabilities[0, i].item(),
            "binary_classification": predicted_binary[i]
        }
    return result
    
