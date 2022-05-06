import { atom, selector } from "recoil";
import { parseIsolatedEntityName } from "typescript";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});
export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);

    return minutes / 60;
  },
});
