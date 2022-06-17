import { atom, selector } from "recoil";

export const atomTodo = atom({
  key: "todo",
  default: ["a", "b", "c", "d", "e", "f"],
});
