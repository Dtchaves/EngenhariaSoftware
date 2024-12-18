from flask import Flask, jsonify, request
from flask_cors import CORS
from api import create_app

app = create_app()

CORS(app, supports_credentials=True)

users = {
    "user": "password"  
}

@app.route('/', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

# @app.route('/api/login', methods=['POST'])
# def login():
#     credentials = request.json
#     username = credentials.get("username")
#     password = credentials.get("password")

#     if username in users and users[username] == password:
#         return jsonify({"message": "Login successful!"}), 200
#     else:
#         return jsonify({"message": "Invalid credentials!"}), 401

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=4000)
