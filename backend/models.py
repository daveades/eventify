from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Event(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(10), nullable=False)

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Auto-incremented integer ID
    event_id = db.Column(db.String(36), db.ForeignKey('event.id'), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    event = db.relationship('Event', backref=db.backref('tickets', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'email': self.email
        }