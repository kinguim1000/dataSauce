import { DataSource } from "typeorm";
import { TodoEntity } from "../models/todos.js";
import { UserEntity } from "../models/users.js";

export const dataSauce = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 2345,
  username: "user",
  password: "password",
  database: "db",
  synchronize: true,
  entities: [TodoEntity, UserEntity],
});
