import { dataSauce } from "../database/dataSauce.js";
import { TodoEntity } from "../models/todos.js";
import { validate } from "uuid";

const todosRepository = dataSauce.getRepository(TodoEntity);

export async function createTodo(req, res) {
  console.log(req.userId);
  const { content } = req.body; //Captura dados da req
  const todo = todosRepository.create({ content }); //Cria todo
  try {
    const result = await todosRepository.save(todo); //Salva no banco de dados
    return res.json(result);
  } catch {
    return res.status(500).send();
  }
}

export async function deleteTodo(req, res) {
  const id = req.params.id;

  if (!validate(id)) {
    return res.status(400).send();
  }
  const todo = await todosRepository.findOneBy({ id });

  if (!todo) {
    return res.status(404).send();
  }
  try {
    const result = await todosRepository.delete(todo.id);
    return res.json(result);
  } catch {
    return res.status(500).send();
  }
}
