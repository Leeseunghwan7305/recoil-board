import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minute",
  default: 0,
});

export const hourSelector = selector<number>({
  //minuteState의 값을 수정해서 얻을려면 selector
  key: "hours", //atom하나를 더 안만들어도됨
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  }, //읽기
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
