import { Router } from "express";
import { middleware } from "../middleware/middleware.js";
import { createTodo, deleteTodo } from "../views/todoViews.js";
export const postLogin = Router();

postLogin.use(middleware);
postLogin.post("/createtodo", createTodo);
postLogin.get("/deletetodo/:id", deleteTodo);
