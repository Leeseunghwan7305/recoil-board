import React, { InputHTMLAttributes, useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.ul`
  list-style: none;
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px;
  margin: 5px;
  width: 150px;
  min-height: 200px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 16px;
  text-align: center;
`;

const Area = styled.div<IDragging>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#05C19C"
      : props.isDraggingFromThis
      ? "#65FBD2"
      : "transparent"};
  border-radius: 5%;
  padding: 10px;
  transition: all 0.5s;
`;
interface IDragging {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IBoardProps {
  toDos: string[];
  boardID: string;
}
const Board = ({ toDos, boardID }: IBoardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sendTodo = () => {
    inputRef.current?.focus();
    if (inputRef.current?.value) inputRef.current.value = "";
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000);
  };

  return (
    <Wrapper>
      <Title>{boardID}</Title>
      <input ref={inputRef} placeholder="grap me"></input>
      <button onClick={sendTodo}>Click me</button>
      <Droppable droppableId={boardID}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((todo, index) => (
              <DraggableCard
                key={todo}
                index={index}
                todo={todo}
              ></DraggableCard>
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
