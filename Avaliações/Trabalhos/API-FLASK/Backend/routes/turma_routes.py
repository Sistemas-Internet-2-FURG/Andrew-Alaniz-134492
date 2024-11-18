from flask import Blueprint, jsonify, request
from models.turma import Turma
from db import db

turma_bp = Blueprint('turma_bp', __name__)

@turma_bp.route('/', methods=['GET'])
def get_turmas():
    turmas = Turma.query.all()
    return jsonify([turma.to_dict() for turma in turmas]), 200

@turma_bp.route('/', methods=['POST'])
def create_turma():
    data = request.get_json()
    nova_turma = Turma(codigo=data['codigo'], nome=data['nome'])
    db.session.add(nova_turma)
    db.session.commit()
    return jsonify(nova_turma.to_dict()), 201

@turma_bp.route('/<string:codigo>', methods=['GET'])
def get_turma(codigo):
    turma = Turma.query.get(codigo)
    if turma:
        return jsonify(turma.to_dict()), 200
    return jsonify({'message': 'Turma não encontrada'}), 404

@turma_bp.route('/<string:codigo>', methods=['PUT'])
def update_turma(codigo):
    turma = Turma.query.get(codigo)
    if turma:
        data = request.get_json()
        turma.nome = data['nome']
        db.session.commit()
        return jsonify(turma.to_dict()), 200
    return jsonify({'message': 'Turma não encontrada'}), 404

@turma_bp.route('/<string:codigo>', methods=['DELETE'])
def delete_turma(codigo):
    turma = Turma.query.get(codigo)
    if turma:
        db.session.delete(turma)
        db.session.commit()
        return jsonify({'message': 'Turma deletada com sucesso'}), 200
    return jsonify({'message': 'Turma não encontrada'}), 404
