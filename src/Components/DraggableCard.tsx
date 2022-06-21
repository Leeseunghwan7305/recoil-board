import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
const Llist = styled.li<{ isDragging: boolean }>`
  font-size: 16px;
  background-color: ${(props) => (props.isDragging ? "#FFD887" : "#C4FCEF")};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
  padding: 15px;
  margin: 5px 0;
  border-radius: 5px;
  flex-grow: 1;
`;
const DraggableCard = ({ toDoId, toDoText, index }: IDragabbleCardProps) => {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, info) => (
        <Llist
          isDragging={info.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Llist>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
