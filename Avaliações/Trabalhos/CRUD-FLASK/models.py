from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Turma(db.Model):
    __tablename__ = 'turmas'
    codigo = db.Column(db.String(10), primary_key=True)  # Novo código de turma como chave primária
    nome = db.Column(db.String(80), nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)

class Aluno(db.Model):
    __tablename__ = 'alunos'
    matricula = db.Column(db.String(10), primary_key=True)  # Nova matrícula como chave primária
    nome = db.Column(db.String(80), nullable=False)
    turma_codigo = db.Column(db.String(10), db.ForeignKey('turmas.codigo'), nullable=False)
    turma = db.relationship('Turma', backref=db.backref('alunos', lazy=True))

class Professor(db.Model):
    __tablename__ = 'professores'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    turmas = db.relationship('Turma', backref='professor', lazy=True)
