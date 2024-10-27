from flask import Flask
from flask_login import LoginManager
from api.models import db, Patient, Doctor, Admin

login_manager = LoginManager()

def create_app(model_path=None):
    app = Flask(__name__)
    app.config.from_object('api.config.Config')

    if model_path:
        app.config['MODEL_PATH'] = model_path

    db.init_app(app)
    login_manager.init_app(app)

    from api.auth import auth
    app.register_blueprint(auth, url_prefix='/api')

    from api.routes import doctor_routes, patient_routes, admin_routes, message_routes, report_routes
    app.register_blueprint(doctor_routes.routes, url_prefix='/api')
    app.register_blueprint(patient_routes.routes, url_prefix='/api')
    app.register_blueprint(admin_routes.routes, url_prefix='/api')
    app.register_blueprint(message_routes.routes, url_prefix='/api')
    app.register_blueprint(report_routes.routes, url_prefix='/api')

    with app.app_context():
        db.create_all()

    return app

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(user_id) or Doctor.query.get(user_id) or Patient.query.get(user_id)
