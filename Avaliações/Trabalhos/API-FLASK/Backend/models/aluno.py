from db import db

class Aluno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    matricula = db.Column(db.String(20), unique=True, nullable=False)

    turmas = db.relationship('Turma', secondary='aluno_turma', backref=db.backref('alunos', lazy=True))

    def __repr__(self):
        return f"<Aluno {self.nome}>"
