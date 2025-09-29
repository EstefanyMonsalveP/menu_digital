# Menú Digital - Aplicación Web

Aplicación web para crear y gestionar platos de un menú digital.  
Construida con **Angular** en el frontend, **Node.js/Express** en el backend y **MongoDB Atlas** como base de datos.  
Se utiliza **Bootstrap** para estilos y diseño responsivo.

---

## 💻 Tecnologías usadas

- **Frontend:** Angular, Bootstrap  
- **Backend:** Node.js, Express  
- **Base de datos:** MongoDB Atlas  
- **Autenticación:** JWT (opcional)  
- **Otras librerías:** CORS, dotenv, Mongoose 

---

## 📁 Estructura del proyecto
-Backend/
-Frontend/
-.gitignore.
-README


---

## ⚙️ Configuración de variables de entorno

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombreDB>?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_para_tokens
NODE_ENV = development
FRONTEND_URL=http://localhost:4200


**Notas:**

- `<usuario>` y `<contraseña>`: credenciales de tu usuario en MongoDB Atlas.  
- `<cluster>`: nombre de tu cluster en Atlas.  
- `<nombreDB>`: nombre de la base de datos que usarás.  
- `JWT_SECRET`: cualquier cadena aleatoria para firmar los tokens JWT (si se usa autenticación).  
- En desarrollo, MongoDB Atlas solo permitirá tu IP, asegúrate de añadir tu IP en la lista de IP permitidas en Atlas.

--- 


## 🏃‍♂️ Ejecutar el proyecto

### 1️⃣ Backend

1. Ingresa a la carpeta `backend`:

```bash
cd backend

2. Instala dependencias:
npm install

##Backend
npm run dev       

verificar que el launch abra estas variables en la configuracion:
"runtimeArgs": ["-r", "ts-node/register/transpile-only"],
      "args": ["${workspaceFolder}/backend/src/index.ts"],
      "cwd": "${workspaceFolder}/backend"

##  2️⃣ Frontend

1. Ingresa a la carpeta `frontend`:
npm install
ng serve
Abre tu navegador en http://localhost:4200 `(Puerto predeterminado`)

🔧 Librerías y herramientas:

Node.js, Express
TypeScript
MongoDB + Mongoose
JWT para autenticación
Zod para validación de datos
bcrypt para hashing de contraseñas
Bootstrap para estilos

## 📝 Prerrequisitos
- Node.js >= 22.x
- npm >= 10.x
- Angular CLI >= 20.x
- MongoDB Atlas account

---

## ⚡ Scripts útiles

### Backend
- `npm run dev` → corre el servidor con nodemon y TypeScript.
- `npm run build` → transpila TypeScript a JavaScript en `/dist`.
- `npm start` → ejecuta el código compilado en `/dist`.

### Frontend
- `ng serve` → corre la aplicación Angular en modo desarrollo.
- `ng build` → genera la build para producción en `/dist`.

---

## 📌 Endpoints principales

### Auth
- `POST /api/auth` → Iniciar sesión

### Users
- `POST /api/users` → Registrar usuario

### Platos
- `GET /api/dishes` → Listar platos
- `POST /api/dishes` → Crear plato
- `PUT /api/dishes/:id` → Actualizar plato
- `DELETE /api/dishes/:id` → Eliminar plato

