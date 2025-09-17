-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Crear tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Insertar usuarios de ejemplo
INSERT INTO usuarios (username, password) VALUES
('ruben', '1234'),
('ana', 'abcd');

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, usuario_id) VALUES
('Huevos Camperos', 'Huevos camperos de La Fuente Grande', 2.0, 1),
('Aceite de Oliva', 'Aceite virgen extra', 5.5, 1),
('Miel Natural', 'Miel pura de flores', 4.0, 2),
('Queso de Cabra', 'Queso artesanal', 6.0, 2);
