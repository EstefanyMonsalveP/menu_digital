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


## 🏃‍♂️ Ejecutar el proyecto

### 1️⃣ Backend

1. Ingresa a la carpeta `backend`:

```bash
cd backend

2. Instala dependencias:
npm install

3. Desarrollo (recomendado con depuración)

Debido a cómo se cargan las variables de entorno y TypeScript, ejecutar npm run dev directamente puede no funcionar correctamente.

Se recomienda iniciar la aplicación mediante el depurador de tu IDE (por ejemplo, VS Code):

Abrir la paleta de ejecución en VS Code.

Seleccionar Run and Debug con la configuración de Node.js.

Esto asegura que TypeScript y las variables de entorno se carguen correctamente

verificar que el launch abra estas variables en la configuracion:
"runtimeArgs": ["-r", "ts-node/register/transpile-only"],
      "args": ["${workspaceFolder}/backend/src/index.ts"],
      "cwd": "${workspaceFolder}/backend"

### 2️⃣ Frontend

npm install
ng serve
Abre tu navegador en http://localhost:4200 `(Puerto predeterminado`)

🔧 Tecnologías
Actualmente lo pones mezclado al final. Mejor crear una sección 🔧 Librerías y herramientas:

Node.js, Express

TypeScript

MongoDB + Mongoose

JWT para autenticación

Zod para validación de datos

bcrypt para hashing de contraseñas

Bootstrap para estilos

