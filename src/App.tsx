import React, { InputHTMLAttributes } from "react";
import logo from "./logo.svg";
import "./App.css";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atom";

function App() {
  let [miniute, setMinite] = useRecoilState(minuteState);
  let [hours, setHours] = useRecoilState(hourSelector);
  const changeMinite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinite(+e.target.value);
  };
  const changeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHours(+e.target.value);
  };
  return (
    <div className="App">
      <input
        value={miniute}
        onChange={changeMinite}
        type="number"
        placeholder="minutes"
      />
      <input
        value={hours}
        onChange={changeHours}
        type="number"
        placeholder="hours"
      />
    </div>
  );
}

export default App;
