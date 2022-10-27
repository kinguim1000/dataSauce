import { EntitySchema } from "typeorm";

export class Todo {
  constructor(content) {
    this.content = content;
    this.isComplete = false;
  }
}

export const TodoEntity = new EntitySchema({
  name: "Todo",
  target: Todo,
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    createdAt: { type: "timestamp", default: "now()" },
    content: { type: "varchar" },
    isComplete: { type: "bool", default: false },
  },
  relations: {
    owner: {
      target: "User",
      type: "many-to-one",
      cascade: true,
    },
  },
});
