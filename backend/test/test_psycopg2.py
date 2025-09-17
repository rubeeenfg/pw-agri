import psycopg2

DB_NAME = "agri_bd"
DB_USER = "postgres"
DB_PASSWORD = "1234"
DB_HOST = "localhost"
DB_PORT = "5432"

try:
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    print("¡Conexión a PostgreSQL exitosa!")
    conn.close()
except Exception as e:
    print("Error conectando a PostgreSQL:", e)
