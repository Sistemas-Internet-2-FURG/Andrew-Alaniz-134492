from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Turma, Aluno

api_routes = Blueprint('api', __name__)

@api_routes.route('/turmas', methods=['GET'])
@jwt_required()
def listar_turmas():
    turmas = Turma.query.all()
    return jsonify([{'codigo': t.codigo, 'nome': t.nome, 'professor_id': t.professor_id} for t in turmas])

@api_routes.route('/criar_turma', methods=['POST'])
@jwt_required()
def criar_turma():
    current_user = get_jwt_identity()
    if current_user['role'] != 'professor':
        return jsonify(message="Acesso negado"), 403

    data = request.json
    turma = Turma(codigo=data['codigo'], nome=data['nome'], professor_id=current_user['id'])
    db.session.add(turma)
    db.session.commit()
    return jsonify(message="Turma criada")

@api_routes.route('/criar_aluno', methods=['POST'])
@jwt_required()
def criar_aluno():
    data = request.json
    aluno = Aluno(matricula=data['matricula'], nome=data['nome'])
    db.session.add(aluno)
    db.session.commit()
    return jsonify(message="Aluno criado")

@api_routes.route('/matricular', methods=['POST'])
@jwt_required()
def matricular():
    current_user = get_jwt_identity()
    if current_user['role'] != 'aluno':
        return jsonify(message="Acesso negado"), 403

    data = request.json
    aluno = Aluno.query.filter_by(matricula=current_user['id']).first()
    if aluno:
        aluno.turma_codigo = data['turma_codigo']
        db.session.commit()
        return jsonify(message="Aluno matriculado")
    return jsonify(message="Aluno não encontrado"), 404

@api_routes.route('/deletar_turma/<codigo>', methods=['DELETE'])
@jwt_required()
def deletar_turma(codigo):
    turma = Turma.query.get_or_404(codigo)
    db.session.delete(turma)
    db.session.commit()
    return jsonify(message="Turma deletada")
