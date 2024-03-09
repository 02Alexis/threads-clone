import express from "express";
import dotenv from "dotenv";
import conectionDB from "./db/conectionDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
conectionDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // Para dividir datos JSON en el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true })); // Para analizar los datos del formulario en el cuerpo de la solicitud
app.use(cookieParser());

// Rutas
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`port: http://localhost:${PORT}`));
