import { Router } from "express";
import { createUser, login } from "../views/userViews.js";

export const preLogin = Router();

preLogin.post("/createuser", createUser);
preLogin.post("/login", login);
