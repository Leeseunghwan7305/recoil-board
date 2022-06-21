import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}
export const atomTodo = atom<IToDoState>({
  key: "todo",
  default: {
    Todo: [],
    doing: [],
    done: [],
  },
});
