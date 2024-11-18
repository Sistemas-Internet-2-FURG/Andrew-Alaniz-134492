from flask import Flask, jsonify, request, send_from_directory
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from config import Config
from db import db
from utils.auth import init_jwt

# Importação das rotas
from routes.aluno_routes import aluno_bp
from routes.turma_routes import turma_bp
from routes.professor_routes import professor_bp

app = Flask(__name__, static_folder='../frontend', static_url_path='/')
app.config.from_object(Config)

# Inicializar banco de dados e JWT
db.init_app(app)
init_jwt(app)

# Registrar os blueprints
app.register_blueprint(aluno_bp, url_prefix='/api/alunos')
app.register_blueprint(turma_bp, url_prefix='/api/turmas')
app.register_blueprint(professor_bp, url_prefix='/api/professores')

# Definir as credenciais de exemplo
USERS = {
    "professor1": {"password": "senha123", "role": "professor"},
    "aluno1": {"password": "senha123", "role": "aluno"}
}

# Rota para servir o index.html
@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    # Verificar se o usuário existe e a senha está correta
    user = USERS.get(username)
    if user and user["password"] == password:
        # Gerar o token de acesso com o tipo de usuário
        access_token = create_access_token(identity=username, additional_claims={"role": user["role"]})
        return jsonify(access_token=access_token), 200
    return jsonify(message='Credenciais inválidas'), 401

@app.route('/dashboard')
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    claims = get_jwt()  # Substituto para get_jwt_claims()

    if claims.get('role') == 'professor':
        return jsonify(message=f"Bem-vindo professor {current_user}! Você pode criar turmas."), 200
    elif claims.get('role') == 'aluno':
        return jsonify(message=f"Bem-vindo aluno {current_user}! Você pode entrar em turmas."), 200
    else:
        return jsonify(message="Papel desconhecido."), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Cria as tabelas no banco de dados
    app.run(debug=True)
