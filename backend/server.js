import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRouter from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(cors({credentials : true}))
app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log("Server started on port " + port);
});
