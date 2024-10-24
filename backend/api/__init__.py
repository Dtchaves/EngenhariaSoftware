from flask import Flask
from flask_login import LoginManager
from app.models import db, Patient, Doctor, Admin

login_manager = LoginManager()

def create_app(model_path=None):
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    if model_path:
        app.config['MODEL_PATH'] = model_path

    db.init_app(app)
    login_manager.init_app(app)

    from app.auth import auth
    app.register_blueprint(auth)

    from app.routes import main
    app.register_blueprint(main)

    with app.app_context():
        db.create_all()

    return app

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(user_id) or Doctor.query.get(user_id) or Patient.query.get(user_id)
