from your_flask_app import create_app
from app.constants import PORT

app = create_app()

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG', True), host='0.0.0.0', port=app.config['PORT'])

