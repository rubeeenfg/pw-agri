from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus

DB_USER = "postgres"
DB_PASSWORD = quote_plus("1234")  # Escapa caracteres especiales
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "agri_bd"

# IMPORTANTE: forzamos UTF-8 para evitar UnicodeDecodeError
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?client_encoding=utf8"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
