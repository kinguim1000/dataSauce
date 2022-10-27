import { EntitySchema } from "typeorm";

export class User {
  constructor(content) {
    this.content = content;
  }
}

export const UserEntity = new EntitySchema({
  name: "User",
  target: User,
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    createdAt: { type: "timestamp", default: "now()" },
    name: { type: "varchar" },
    email: { type: "varchar" },
    password: { type: "varchar" },
  },
});
