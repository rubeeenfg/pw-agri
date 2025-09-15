from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://admin:vMM3xS7PYI7nWBJ2jF812itKvXPtcuFu@dpg-d33s4e6mcj7s73al0cpg-a.oregon-postgres.render.com/agri_bd"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
