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

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Ulist = styled.ul`
  list-style: none;
  min-width: 200px;
  background-color: ${(props) => props.theme.boardColor};

  padding: 10px 30px;
`;

function App() {
  console.log("hi");
  const [Todo, setTodo] = useRecoilState(atomTodo);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setTodo((oldToDos) => {
      const copyToDos = [...oldToDos];
      copyToDos.splice(source.index, 1);
      if (destination) {
        copyToDos.splice(destination?.index, 0, draggableId);
      }
      return copyToDos;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="one">
          {(magic) => (
            <Ulist ref={magic.innerRef} {...magic.droppableProps}>
              {Todo.map((todo, index) => (
                <DraggableCard
                  key={todo}
                  index={index}
                  todo={todo}
                ></DraggableCard>
              ))}
              {magic.placeholder}
            </Ulist>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
