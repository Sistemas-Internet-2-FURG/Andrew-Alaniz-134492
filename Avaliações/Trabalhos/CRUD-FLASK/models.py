from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(10), nullable=False)  # 'professor' ou 'aluno'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Turma(db.Model):
    __tablename__ = 'turmas'
    codigo = db.Column(db.String(10), primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class Aluno(db.Model):
    __tablename__ = 'alunos'
    matricula = db.Column(db.String(10), primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    turma_codigo = db.Column(db.String(10), db.ForeignKey('turmas.codigo'), nullable=True)
