from flask import Blueprint, jsonify, request
from models.professor import Professor
from db import db

professor_bp = Blueprint('professor_bp', __name__)

@professor_bp.route('/', methods=['GET'])
def get_professores():
    professores = Professor.query.all()
    return jsonify([professor.to_dict() for professor in professores]), 200

@professor_bp.route('/', methods=['POST'])
def create_professor():
    data = request.get_json()
    novo_professor = Professor(nome=data['nome'])
    db.session.add(novo_professor)
    db.session.commit()
    return jsonify(novo_professor.to_dict()), 201

@professor_bp.route('/<int:id>', methods=['GET'])
def get_professor(id):
    professor = Professor.query.get(id)
    if professor:
        return jsonify(professor.to_dict()), 200
    return jsonify({'message': 'Professor não encontrado'}), 404

@professor_bp.route('/<int:id>', methods=['PUT'])
def update_professor(id):
    professor = Professor.query.get(id)
    if professor:
        data = request.get_json()
        professor.nome = data['nome']
        db.session.commit()
        return jsonify(professor.to_dict()), 200
    return jsonify({'message': 'Professor não encontrado'}), 404

@professor_bp.route('/<int:id>', methods=['DELETE'])
def delete_professor(id):
    professor = Professor.query.get(id)
    if professor:
        db.session.delete(professor)
        db.session.commit()
        return jsonify({'message': 'Professor deletado com sucesso'}), 200
    return jsonify({'message': 'Professor não encontrado'}), 404
