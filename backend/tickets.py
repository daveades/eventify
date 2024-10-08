from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Ticket, Event

tickets_bp = Blueprint('tickets', __name__)

# Route to retrieve all tickets purchased by the authenticated user
@tickets_bp.route('/tickets', methods=['GET'])
@jwt_required()
def get_tickets():
    current_user = get_jwt_identity()
    current_user_email = current_user['email']
    tickets = Ticket.query.filter_by(email=current_user_email).all()
    return jsonify([ticket.to_dict() for ticket in tickets])

# Retrieve a ticket by ID
@tickets_bp.route('/tickets/<int:id>', methods=['GET'])
@jwt_required()
def get_ticket(id):
    current_user = get_jwt_identity()
    current_user_email = current_user['email']
    ticket = Ticket.query.get(id)
    if ticket is None or ticket.email != current_user_email:
        return jsonify({'error': 'Ticket not found or unauthorized'}), 404
    return jsonify(ticket.to_dict())

# Route to update a specific ticket by ID
@tickets_bp.route('/tickets/<int:id>', methods=['PUT'])
@jwt_required()
def update_ticket(id):
    ticket = Ticket.query.get(id)
    if ticket is None:
        return jsonify({'error': 'Ticket not found'}), 404
    data = request.json
    ticket.email = data['email']
    db.session.commit()
    return jsonify(ticket.to_dict())

# Route to delete a specific ticket by ID
@tickets_bp.route('/tickets/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_ticket(id):
    ticket = Ticket.query.get(id)
    if ticket is None:
        return jsonify({'error': 'Ticket not found'}), 404
    db.session.delete(ticket)
    db.session.commit()
    return '', 204

# Route to purchase tickets for an event
@tickets_bp.route('/purchase_ticket', methods=['POST'])
@jwt_required()
def purchase_ticket():
    current_user = get_jwt_identity()
    user_email = current_user['email']
    data = request.json
    event_id = data.get('event_id')
    num_tickets = data.get('num_tickets', 1)

    event = Event.query.get(event_id)
    if event is None:
        return jsonify({'error': 'Event not found'}), 404

    tickets_purchased = []
    for _ in range(num_tickets):
        ticket = Ticket(event_id=event_id, email=user_email)
        db.session.add(ticket)
        tickets_purchased.append(ticket)

    db.session.commit()

    # Send email with ticket details
    send_ticket_email(user_email, tickets_purchased)

    return jsonify([ticket.to_dict() for ticket in tickets_purchased]), 201

def send_ticket_email(to_email, tickets):
    # Implement email sending logic here
    pass