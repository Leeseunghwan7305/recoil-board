import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IDragabbleCardProps {
  todo: string;
  index: number;
}
const Llist = styled.li`
  font-size: 16px;
  background-color: yellowgreen;
  padding: 15px;
  margin: 5px 0;
  border-radius: 5px;
  flex-grow: 1;
`;
const DraggableCard = ({ todo, index }: IDragabbleCardProps) => {
  console.log(todo);
  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {(magic) => (
        <Llist
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todo}
        </Llist>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
