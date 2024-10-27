from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from api.models import db, Message

routes = Blueprint('message_routes', __name__)

@routes.route('/messages', methods=['POST'])
@login_required
def send_message():
    try:
        sender_id = current_user.id
        receiver_id = request.json['receiver_id']
        content = request.json['content']

        message = Message(sender_id=sender_id, receiver_id=receiver_id, content=content)
        db.session.add(message)
        db.session.commit()

        return make_response(jsonify({'message': 'Message sent'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

@routes.route('/messages/<int:user_id>', methods=['GET'])
@login_required
def get_messages(user_id):
    try:
        messages = Message.query.filter(
            (Message.sender_id == current_user.id) & (Message.receiver_id == user_id) |
            (Message.receiver_id == current_user.id) & (Message.sender_id == user_id)
        ).all()
        return make_response(jsonify([{'content': msg.content, 'timestamp': msg.timestamp} for msg in messages]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)