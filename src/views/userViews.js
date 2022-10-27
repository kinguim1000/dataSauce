import { dataSauce } from "../database/dataSauce.js";
import { UserEntity } from "../models/users.js";
import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
export const usersRepository = dataSauce.getRepository(UserEntity);

export async function createUser(req, res) {
  const { email, name, password } = req.body; //Captura dados da req
  const hashedPassword = await hash(password, 8);
  const user = usersRepository.create({
    email,
    name,
    password: hashedPassword,
  }); //Cria
  try {
    const result = await usersRepository.save(user); //Salva no banco de dados
    delete result.password;
    return res.json(result);
  } catch {
    return res.status(500).send();
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await usersRepository.findOneBy({ email });

  if (!user) {
    return res.status(400).send();
  }

  const isPasswordCorrect = bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).send();
  }

  const accessToken = jsonwebtoken.sign({}, "segredo", {
    subject: user.id,
    expiresIn: "1d",
  });

  return res.json({ accessToken });
}
