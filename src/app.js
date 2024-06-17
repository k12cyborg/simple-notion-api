// Express initialiser
import express from "express";
import cors from "cors";
import noteRouter from "./routes/notes.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/api", noteRouter);

export default app;
