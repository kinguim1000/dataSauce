import "reflect-metadata";

import express, { json } from "express";
import { dataSauce } from "./database/dataSauce.js";
import { createTodo } from "./views/todoViews.js";
import { createUser } from "./views/userViews.js";
import { login } from "./views/userViews.js";
import { UserEntity } from "./models/users.js";
import { postLogin } from "./router/postLogin.router.js";
import { preLogin } from "./router/preLogin.router.js";

const server = express();

server.use(json());
server.use(preLogin);
server.use(postLogin);
async function preguica() {
  try {
    await dataSauce.initialize();
    server.listen(3333, () => console.log("Server walking!"));
  } catch (error) {
    console.log(error);
  }
}

preguica();
