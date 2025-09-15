from app.database import SessionLocal
from app.models import Producto

# Crear sesión de DB
db = SessionLocal()

# Lista de productos de prueba
productos = [
    {"nombre": "Tomates", "descripcion": "Tomates frescos de huerta", "precio": 2.5},
    {"nombre": "Aceite de Oliva", "descripcion": "Aceite extra virgen 500ml", "precio": 8.0},
    {"nombre": "Leche de vaca", "descripcion": "Leche fresca 1L", "precio": 1.2},
    {"nombre": "Huevos", "descripcion": "Docena de huevos camperos", "precio": 3.0},
    {"nombre": "Queso Manchego", "descripcion": "Queso curado 250g", "precio": 5.5},
]

# Insertar productos
for p in productos:
    producto = Producto(nombre=p["nombre"], descripcion=p["descripcion"], precio=p["precio"])
    db.add(producto)

db.commit()
db.close()

print("Productos de prueba insertados ✅")
