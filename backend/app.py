from flask import Flask
from events import events_bp
from tickets import tickets_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(events_bp)
app.register_blueprint(tickets_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)