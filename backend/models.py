from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)  # Add email field
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Auto-incremented integer ID
    name = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    user_id = db.column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date,
            'user_id': self.user_id
        }

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    event = db.relationship('Event', backref=db.backref('tickets', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'email': self.email
        }