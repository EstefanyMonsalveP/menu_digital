import path from "path";
import dotenv from 'dotenv';
import Express from "express";
import { conexionDB } from "./data/db";
import dishRouter from "./routes/dishRouter";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({
  path: path.resolve(__dirname, "../..", process.env.NODE_ENV === "production" ? ".env.production" : ".env")});

const app = Express();

const allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:3000",
  "https://menu-digital-frontend.onrender.com"
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log("🔍 Origin recibido:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      console.log("✅ CORS permitido para:", origin);
      callback(null, true);
    } else {
      console.warn("❌ Origen no permitido por CORS:", origin);
      callback(new Error("CORS no permitido para este origen"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.options("*", cors(corsOptions));

app.use(Express.json());
app.use(cookieParser());

//Obtiene el puerto desde la variable de entorno
const PORT = process.env.PORT;

//Si no esta definido el puerto, enviar el error y detener la ejecución.
if(!PORT)throw new Error("Se presentaron problemas para inicializar el puerto");

conexionDB(); //Se invoca la función para conectar la base de datos.

//Rutas relacionadas con los platos
app.use("/api/dishes", dishRouter)

//Rutas relacionadas con el usuario
app.use("/api/users", userRouter)

//Rutas relacionadas con la autenticacion de usuario
app.use("/api/auth", authRouter)

// Servir Angular compilado solo en producción
if (process.env.NODE_ENV === "production") {
    const angularDistPath = path.join(__dirname, "../../frontend/dist/frontend/browser");

    app.use(Express.static(angularDistPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(angularDistPath, "index.html"));
    });
}

//Inicializa el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

