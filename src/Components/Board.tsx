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
      ? "pink"
      : props.isDraggingFromThis
      ? "red"
      : "transparent"};
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
  return (
    <Wrapper>
      <Title>{boardID}</Title>
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
