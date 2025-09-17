
from app.database import engine

try:
    with engine.connect() as conn:
        result = conn.execute("SELECT 1")
        print("¡Conexión a DB OK!", result.fetchone())
except Exception as e:
    print("Error conectando a DB:", e)
