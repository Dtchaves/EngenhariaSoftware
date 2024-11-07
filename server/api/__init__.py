from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate
from api.models import db, Patient, Doctor, Admin
from api.config import Config

login_manager = LoginManager()

def create_app(model_path=None):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)
    migrate = Migrate(app, db)

    from api.auth import auth
    app.register_blueprint(auth, url_prefix='/api')

    from api.routes import doctor_routes, patient_routes, admin_routes, message_routes, report_routes
    app.register_blueprint(doctor_routes.routes, url_prefix='/api')
    app.register_blueprint(patient_routes.routes, url_prefix='/api')
    app.register_blueprint(admin_routes.routes, url_prefix='/api')
    app.register_blueprint(message_routes.routes, url_prefix='/api')
    app.register_blueprint(report_routes.routes, url_prefix='/api')

    @login_manager.user_loader
    def load_user(user_id):
        return Admin.query.get(user_id) or Doctor.query.get(user_id) or Patient.query.get(user_id)
    
    with app.app_context():
        db.create_all()

    return app

