class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite3'  # Ajuste o caminho do banco de dados conforme necessário
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'super-secret-key'  # Substitua por uma chave secreta segura
