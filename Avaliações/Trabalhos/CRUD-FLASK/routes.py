from flask import Blueprint, render_template, request, redirect, url_for
from models import db, Turma, Aluno, Professor

main_routes = Blueprint('main', __name__)

@main_routes.route('/')
def index():
    turmas = Turma.query.all()
    alunos = Aluno.query.all()
    professores = Professor.query.all()
    return render_template('index.html', turmas=turmas, alunos=alunos, professores=professores)

# Rotas de Turma
@main_routes.route('/criar_turma', methods=['POST'])
def criar_turma():
    codigo = request.form['codigo']
    nome = request.form['nome']
    professor_id = request.form['professor_id']
    nova_turma = Turma(codigo=codigo, nome=nome, professor_id=professor_id)
    db.session.add(nova_turma)
    db.session.commit()
    return redirect(url_for('main.index'))

@main_routes.route('/deletar_turma/<string:codigo>', methods=['POST'])
def deletar_turma(codigo):
    turma = Turma.query.get_or_404(codigo)
    db.session.delete(turma)
    db.session.commit()
    return redirect(url_for('main.index'))

@main_routes.route('/editar_turma/<string:codigo>', methods=['GET', 'POST'])
def editar_turma(codigo):
    turma = Turma.query.get_or_404(codigo)
    if request.method == 'POST':
        turma.nome = request.form['nome']
        turma.professor_id = request.form['professor_id']
        db.session.commit()
        return redirect(url_for('main.index'))
    professores = Professor.query.all()
    return render_template('editar_turma.html', turma=turma, professores=professores)

# Rotas de Aluno
@main_routes.route('/criar_aluno', methods=['POST'])
def criar_aluno():
    matricula = request.form['matricula']
    nome = request.form['nome']
    turma_codigo = request.form['turma_codigo']
    novo_aluno = Aluno(matricula=matricula, nome=nome, turma_codigo=turma_codigo)
    db.session.add(novo_aluno)
    db.session.commit()
    return redirect(url_for('main.index'))

@main_routes.route('/deletar_aluno/<string:matricula>', methods=['POST'])
def deletar_aluno(matricula):
    aluno = Aluno.query.get_or_404(matricula)
    db.session.delete(aluno)
    db.session.commit()
    return redirect(url_for('main.index'))

@main_routes.route('/editar_aluno/<string:matricula>', methods=['GET', 'POST'])
def editar_aluno(matricula):
    aluno = Aluno.query.get_or_404(matricula)
    if request.method == 'POST':
        aluno.nome = request.form['nome']
        aluno.turma_codigo = request.form['turma_codigo']
        db.session.commit()
        return redirect(url_for('main.index'))
    turmas = Turma.query.all()
    return render_template('editar_aluno.html', aluno=aluno, turmas=turmas)

# Rotas de Professor
@main_routes.route('/criar_professor', methods=['POST'])
def criar_professor():
    nome = request.form['nome']
    novo_professor = Professor(nome=nome)
    db.session.add(novo_professor)
    db.session.commit()
    return redirect(url_for('main.index'))

@main_routes.route('/deletar_professor/<int:id>', methods=['POST'])
def deletar_professor(id):
    professor = Professor.query.get_or_404(id)
    db.session.delete(professor)
    db.session.commit()
    return redirect(url_for('main.index'))

@main_routes.route('/editar_professor/<int:id>', methods=['GET', 'POST'])
def editar_professor(id):
    professor = Professor.query.get_or_404(id)
    if request.method == 'POST':
        professor.nome = request.form['nome']
        db.session.commit()
        return redirect(url_for('main.index'))
    return render_template('editar_professor.html', professor=professor)
