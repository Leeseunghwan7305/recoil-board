import React, { InputHTMLAttributes } from "react";
import logo from "./logo.svg";
import "./App.css";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { atomTodo } from "./atom";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { getModeForUsageLocation } from "typescript";
import DraggableCard from "./Components/DraggableCard";
import Board from "./Components/Board";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

function App() {
  const [Todo, setTodo] = useRecoilState(atomTodo);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    /*setTodo((oldToDos) => {
      const copyToDos = [...oldToDos];
      copyToDos.splice(source.index, 1);
      if (destination) {
        copyToDos.splice(destination?.index, 0, draggableId);
      }
      return copyToDos;
    });*/
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {Object.keys(Todo).map((boardId) => {
          return (
            <Board
              key={boardId}
              toDos={Todo[boardId]}
              boardID={boardId}
            ></Board>
          );
        })}
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
