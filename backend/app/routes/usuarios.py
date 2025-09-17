from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.modelo.usuarios import Usuario

router = APIRouter()

@router.post("/usuarios")
def crear_usuario(username: str, password: str, db: Session = Depends(get_db)):
    existe = db.query(Usuario).filter(Usuario.username == username).first()
    if existe:
        raise HTTPException(status_code=400, detail="Usuario ya existe")
    nuevo = Usuario(username=username, password=password)
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return {"id": nuevo.id, "username": nuevo.username}
