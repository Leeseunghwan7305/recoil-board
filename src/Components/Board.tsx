import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.ul`
  list-style: none;
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px;
  margin: 5px;
  width: 150px;
  border-radius: 5px;
`;
const Title = styled.h1`
  font-size: 16px;
  text-align: center;
`;
interface IBoardProps {
  toDos: string[];
  boardID: string;
}
const Board = ({ toDos, boardID }: IBoardProps) => {
  return (
    <Droppable droppableId={boardID}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          <Title>{boardID}</Title>
          {toDos.map((todo, index) => (
            <DraggableCard key={todo} index={index} todo={todo}></DraggableCard>
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Board;
