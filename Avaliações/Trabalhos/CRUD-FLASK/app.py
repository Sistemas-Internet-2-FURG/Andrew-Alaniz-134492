from flask import Flask
from config import Config
from models import db
from routes import main_routes

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

# Criar as tabelas, se ainda não existirem
with app.app_context():
    db.create_all()

# Registrar as rotas
app.register_blueprint(main_routes)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
