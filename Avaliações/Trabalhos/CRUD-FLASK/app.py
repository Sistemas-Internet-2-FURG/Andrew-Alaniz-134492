from flask import Flask, render_template
from config import Config
from models import db
from auth import auth_routes
from routes import api_routes
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(api_routes, url_prefix='/api')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
