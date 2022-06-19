import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}
export const atomTodo = atom<IToDoState>({
  key: "todo",
  default: {
    Todo: ["a", "b"],
    doing: ["c", "d"],
    done: ["e", "f"],
  },
});
