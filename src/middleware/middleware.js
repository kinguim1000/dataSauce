import jwt from "jsonwebtoken";
import { usersRepository } from "../views/userViews.js";
export async function middleware(req, res, next) {
  const BearerToken = req.headers.authorization;

  if (!BearerToken) {
    return res.status(400).send;
  }

  const token = BearerToken.split(" ")[1];

  if (!token) {
    return res.status(400).send;
  }

  const { sub: userId } = jwt.verify(token, "segredo");

  const user = await usersRepository.findOne(userId);
  if (!user) {
    return res.status(400).send;
  }
  req.userId = user.id;
  next();
}
