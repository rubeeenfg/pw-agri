from pydantic import BaseModel

class ProductoBase(BaseModel):
    nombre: str
    descripcion: str
    precio: float

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(ProductoBase):
    pass

class ProductoOut(ProductoBase):
    id: int

    class Config:
        orm_mode = True

class UsuarioCreate(BaseModel):
    username: str
    password: str

# Para respuesta de usuario (sin password)
class UsuarioOut(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True

# Para login
class Token(BaseModel):
    access_token: str
    token_type: str