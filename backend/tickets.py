from flask import Blueprint, request, jsonify
from events import events
import uuid  # Import the uuid module

tickets_bp = Blueprint('tickets', __name__)

# In-memory data structure to store tickets
tickets = []

# Route to create a new ticket
@tickets_bp.route('/tickets', methods=['POST'])
def create_ticket():
    ticket = request.json
    ticket['id'] = str(uuid.uuid4())  # Generate a UUID for the ticket ID
    tickets.append(ticket)
    return jsonify(ticket), 201

# Route to retrieve all tickets
@tickets_bp.route('/tickets', methods=['GET'])
def get_tickets():
    return jsonify(tickets)

# Route to retrieve a specific ticket by ID
@tickets_bp.route('/tickets/<int:id>', methods=['GET'])
def get_ticket(id):
    ticket = next((ticket for ticket in tickets if ticket['id'] == id), None)
    if ticket is None:
        return jsonify({'error': 'Ticket not found'}), 404
    return jsonify(ticket)

# Route to update a specific ticket by ID
@tickets_bp.route('/tickets/<int:id>', methods=['PUT'])
def update_ticket(id):
    ticket = next((ticket for ticket in tickets if ticket['id'] == id), None)
    if ticket is None:
        return jsonify({'error': 'Ticket not found'}), 404
    updated_ticket = request.json
    ticket.update(updated_ticket)
    return jsonify(ticket)

# Route to delete a specific ticket by ID
@tickets_bp.route('/tickets/<int:id>', methods=['DELETE'])
def delete_ticket(id):
    global tickets
    tickets = [ticket for ticket in tickets if ticket['id'] != id]
    return '', 204

# Route to purchase tickets for an event
@tickets_bp.route('/purchase_ticket', methods=['POST'])
def purchase_ticket():
    data = request.json
    event_id = data.get('event_id')
    user_email = data.get('email')
    num_tickets = data.get('num_tickets', 1)

    event = next((event for event in events if event['id'] == event_id), None)
    if event is None:
        return jsonify({'error': 'Event not found'}), 404

    tickets_purchased = []
    for _ in range(num_tickets):
        ticket = {
            'id': str(uuid.uuid4()),  # Generate a UUID for the ticket ID
            'event_id': event_id,
            'email': user_email
        }
        tickets.append(ticket)
        tickets_purchased.append(ticket)

    # Send email with ticket details
    send_ticket_email(user_email, tickets_purchased)

    return jsonify(tickets_purchased), 201

def send_ticket_email(to_email, tickets):
    # Implement email sending logic here
    pass