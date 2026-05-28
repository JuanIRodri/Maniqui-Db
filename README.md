# Maniquí Database 👤

Este proyecto contiene el diseño detallado, los datos iniciales y un dashboard web para la base de datos `Maniqui`, un sistema orientado a la gestión y personalización exhaustiva de las características físicas de figuras o personajes.

## 🚀 Inicio Rápido

La forma más sencilla de arrancar todo el ecosistema (Base de Datos, Backend y Frontend) es utilizando el script de inicialización:

```bash
chmod +x start-app.sh
./start-app.sh
```

Este script se encargará de:
1. Levantar el contenedor de la base de datos con Docker.
2. Instalar dependencias e iniciar el Backend.
3. Instalar dependencias e iniciar el Frontend.

---

## 🛠️ Ejecución Manual

Si prefieres ejecutar cada componente por separado:

### 1. Base de Datos (Docker)
```bash
docker compose up -d
```
*   **Host**: `localhost`
*   **Puerto**: `3306`
*   **Usuario/Pass**: `root` / `root`
*   **Esquema**: `Maniqui` (se inicializa automáticamente).

### 2. Backend (Express)
```bash
cd backend
npm install
node index.js
```
Servidor disponible en `http://localhost:3000`.

### 3. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Dashboard disponible en `http://localhost:5173`.

---

## 📂 Estructura del Proyecto

*   **`sentencias-sql/`**: Scripts SQL de creación, inserción y consultas.
*   **`backend/`**: API REST en Express para conectar la base de datos con la web.
*   **`frontend/`**: Aplicación React para visualizar los personajes.
*   **`docker-compose.yml`**: Configuración de la base de datos MySQL 8.0.

## 📊 Modelo de Datos
La base de datos utiliza una arquitectura de **composición jerárquica**, permitiendo una granularidad total en la definición de cada parte del personaje (Cuerpo, Torso, Extremidades, Rasgos Faciales).

## 🛠️ Requisitos
*   Docker & Docker Compose
*   Node.js (v18+)
*   NPM
