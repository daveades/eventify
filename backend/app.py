from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory data structure to store events
events = []
event_id_counter = 1

# Endpoint to retrieve all events
@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(events)

# Endpoint to create a new event
@app.route('/events', methods=['POST'])
def create_event():
    global event_id_counter
    event = request.json
    event['id'] = event_id_counter
    events.append(event)
    event_id_counter += 1
    return jsonify(event), 201

# Endpoint to retrieve a specific event by ID
@app.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    event = next((event for event in events if event['id'] == id), None)
    if event is None:
        return jsonify({'error': 'Event not found'}), 404
    return jsonify(event)

# Endpoint to update a specific event by ID
@app.route('/events/<int:id>', methods=['PUT'])
def update_event(id):
    event = next((event for event in events if event['id'] == id), None)
    if event is None:
        return jsonify({'error': 'Event not found'}), 404
    updated_event = request.json
    event.update(updated_event)
    return jsonify(event)

# Endpoint to delete a specific event by ID
@app.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    global events
    events = [event for event in events if event['id'] != id]
    return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)