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
import { getModeForUsageLocation, getTextOfJSDocComment } from "typescript";
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
  const onDragEnd = (info: DropResult) => {
    const { draggableId, source, destination } = info;
    if (!destination) return;
    if (source.droppableId == destination.droppableId) {
      setTodo((allBoard) => {
        let copyBoard = [...allBoard[source.droppableId]];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination.index, 0, draggableId);

        return { ...allBoard, [source.droppableId]: copyBoard };
      });
    }
    if (destination.droppableId != source.droppableId) {
      setTodo((allBoard) => {
        let startBoard = [...allBoard[source.droppableId]];
        let destinBoard = [...allBoard[destination.droppableId]];
        startBoard.splice(source.index, 1);
        destinBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allBoard,
          [source.droppableId]: startBoard,
          [destination.droppableId]: destinBoard,
        };
      });
    }
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
