import os

class Config:
    SECRET_KEY = 'minha_chave_secreta'  # Use uma chave segura em produção
    SQLALCHEMY_DATABASE_URI = 'sqlite:///meubanco.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'minha_chave_jwt'  # Chave secreta para JWT