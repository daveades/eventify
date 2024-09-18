from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Event

events_bp = Blueprint('events', __name__)

# Route to retrieve all events
@events_bp.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

# Route to create a new event
@events_bp.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    current_user = get_jwt_identity()
    data = request.json
    event = Event(name=data['name'], date=data['date'], user_id=current_user['id'])
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_dict()), 201

# Route to retrieve events created by the current user
@events_bp.route('/my_events', methods=['GET'])
@jwt_required()
def get_my_events():
    current_user = get_jwt_identity()
    events = Event.query.filter_by(user_id=current_user['id']).all()
    return jsonify([event.to_dict() for event in events])

# Route to update a specific event by ID
@events_bp.route('/events/<int:id>', methods=['PUT'])
@jwt_required()
def update_event(id):
    event = Event.query.get(id)
    if event is None:
        return jsonify({'error': 'Event not found'}), 404
    data = request.json
    event.name = data['name']
    event.date = data['date']
    db.session.commit()
    return jsonify(event.to_dict())