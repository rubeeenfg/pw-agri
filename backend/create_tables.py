from app.database import Base, engine
from app.models import Producto

print("Creando tablas...")
Base.metadata.create_all(bind=engine)
print("Tablas creadas ✅")
