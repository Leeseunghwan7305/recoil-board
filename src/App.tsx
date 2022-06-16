import React, { InputHTMLAttributes } from "react";
import logo from "./logo.svg";
import "./App.css";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { getModeForUsageLocation } from "typescript";

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
const Llist = styled.li`
  font-size: 16px;
  background-color: yellowgreen;
  padding: 15px;
`;
function App() {
  let Todo = ["a", "b", "c", "d", "e", "f"];
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="one">
          {(magic) => (
            <Ulist ref={magic.innerRef} {...magic.droppableProps}>
              {Todo.map((todo, index) => (
                <Draggable draggableId={todo} index={index}>
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
