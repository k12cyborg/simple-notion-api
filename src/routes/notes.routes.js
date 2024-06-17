import { Router } from "express";
import { getNotes } from "../controllers/notes.controller.js";
import { getNote } from "../controllers/notes.controller.js";
import { updateNote } from "../controllers/notes.controller.js";
import { newNote } from "../controllers/notes.controller.js";
import { deleteNote } from "../controllers/notes.controller.js";

const noteRouter = Router();

noteRouter.get("/notes", getNotes);

noteRouter.post("/notes", newNote);

noteRouter.get("/note/:title", getNote);

noteRouter.put("/note/:title", updateNote);

noteRouter.delete("/note/:title", deleteNote)

export default noteRouter;
