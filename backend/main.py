from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import productos, auth
import uvicorn

app = FastAPI()
app.include_router(productos.router)
app.include_router(auth.router)


# Configuración de CORS para permitir peticiones desde tu frontend
origins = [
    "http://localhost:8087",
    "http://127.0.0.1:8087",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Permite ejecutar con python3 main.py
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
