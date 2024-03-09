import express from "express";
import dotenv from "dotenv";
import conectionDB from "./db/conectionDB.js";

dotenv.config();
conectionDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`port: http://localhost:${PORT}`));
