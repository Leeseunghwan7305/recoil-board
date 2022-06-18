import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}
export const atomTodo = atom<IToDoState>({
  key: "todo",
  default: {
    to_do: ["a", "b"],
    doing: ["c", "d"],
    done: ["e", "f"],
  },
});
