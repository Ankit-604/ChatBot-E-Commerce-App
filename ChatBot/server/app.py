import os
from flask import Flask
from extensions import db, jwt, cors

def create_app():
    app = Flask(__name__)
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'chatbot.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'super-secret-key'

    # ✅ Enable CORS
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    jwt.init_app(app)

    from routes.auth import auth_bp
    from routes.chatbot import chatbot_bp
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(chatbot_bp, url_prefix='/api')

    return app


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
