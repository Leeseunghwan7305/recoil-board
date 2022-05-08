import { atom, selector } from "recoil";
import { parseIsolatedEntityName } from "typescript";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});
export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes); //수정하고싶은 아톰 , 수정할값
  }, //atom 을 수정하는걸 도와줌
});

export const toDoState = atom<string[]>({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"],
});
//splice 원본 배열이 바뀜
