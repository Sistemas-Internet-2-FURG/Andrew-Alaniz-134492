from flask import Blueprint, jsonify, request
from models.aluno import Aluno
from db import db

aluno_bp = Blueprint('aluno_bp', __name__)

@aluno_bp.route('/', methods=['GET'])
def get_alunos():
    alunos = Aluno.query.all()
    return jsonify([aluno.to_dict() for aluno in alunos]), 200

@aluno_bp.route('/', methods=['POST'])
def create_aluno():
    data = request.get_json()
    novo_aluno = Aluno(nome=data['nome'], idade=data['idade'])
    db.session.add(novo_aluno)
    db.session.commit()
    return jsonify(novo_aluno.to_dict()), 201

@aluno_bp.route('/<int:id>', methods=['GET'])
def get_aluno(id):
    aluno = Aluno.query.get(id)
    if aluno:
        return jsonify(aluno.to_dict()), 200
    return jsonify({'message': 'Aluno não encontrado'}), 404

@aluno_bp.route('/<int:id>', methods=['PUT'])
def update_aluno(id):
    aluno = Aluno.query.get(id)
    if aluno:
        data = request.get_json()
        aluno.nome = data['nome']
        aluno.idade = data['idade']
        db.session.commit()
        return jsonify(aluno.to_dict()), 200
    return jsonify({'message': 'Aluno não encontrado'}), 404

@aluno_bp.route('/<int:id>', methods=['DELETE'])
def delete_aluno(id):
    aluno = Aluno.query.get(id)
    if aluno:
        db.session.delete(aluno)
        db.session.commit()
        return jsonify({'message': 'Aluno deletado com sucesso'}), 200
    return jsonify({'message': 'Aluno não encontrado'}), 404
