from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Producto

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/productos")
def listar_productos(db: Session = Depends(get_db)):
    productos = db.query(Producto).all()
    return productos
