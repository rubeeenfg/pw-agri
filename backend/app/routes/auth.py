from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.modelo.usuario import Usuario
from app.schemas import UsuarioCreate, UsuarioOut, Token
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt

SECRET_KEY = "TU_SECRETO_SUPER_SEGURO"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

# Dependencia de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Hash password (para cuando quieras usarlo más adelante)
def hash_password(password: str):
    return pwd_context.hash(password)

# Verificación temporal: texto plano
def verify_password(plain_password, hashed_password):
    return plain_password == hashed_password

# Crear JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Registro de usuario
@router.post("/register", response_model=UsuarioOut)
def register(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.username == usuario.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Usuario ya existe")
    nuevo_usuario = Usuario(username=usuario.username, password=hash_password(usuario.password))
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

# Login
@router.post("/login", response_model=Token)
def login(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.username == usuario.username).first()
    if not db_user or not verify_password(usuario.password, db_user.password):
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")
    access_token = create_access_token(data={"sub": db_user.username, "user_id": db_user.id})
    return {"access_token": access_token, "token_type": "bearer"}

