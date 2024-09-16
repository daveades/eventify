from flask import Blueprint, request, jsonify
import uuid  # Import the uuid module

events_bp = Blueprint('events', __name__)

# In-memory data structure to store events
events = []

# Route to retrieve all events
@events_bp.route('/events', methods=['GET'])
def get_events():
    return jsonify(events)

# Route to create a new event
@events_bp.route('/events', methods=['POST'])
def create_event():
    event = request.json
    event['id'] = str(uuid.uuid4())  # Generate a UUID for the event ID and convert it to a string
    events.append(event)
    return jsonify(event), 201

# Route to retrieve a specific event by ID
@events_bp.route('/events/<string:id>', methods=['GET'])
def get_event(id):
    event = next((event for event in events if event['id'] == id), None)
    if event is None:
        return jsonify({'error': 'Event not found'}), 404
    return jsonify(event)

# Route to update a specific event by ID
@events_bp.route('/events/<string:id>', methods=['PUT'])
def update_event(id):
    event = next((event for event in events if event['id'] == id), None)
    if event is None:
        return jsonify({'error': 'Event not found'}), 404
    updated_event = request.json
    event.update(updated_event)
    return jsonify(event)

# Route to delete a specific event by ID
@events_bp.route('/events/<string:id>', methods=['DELETE'])
def delete_event(id):
    global events
    events = [event for event in events if event['id'] != id]
    return '', 204