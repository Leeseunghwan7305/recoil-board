import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { RecoilState, useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const App = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //드래그의 멈취 영역 설정 &&드래그드랍콘택트는 children필요함
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];

      copyToDos.splice(source.index, 1); // 도착 인덱스를 지움
      console.log("Put back", draggableId, "on ", destination.index);
      console.log(destination); //draggableId== toDos의 클릭한 요소
      console.log(source);
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => {
                  return (
                    <Draggable key={toDo} draggableId={toDo} index={index}>
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.dragHandleProps}
                          {...magic.draggableProps}
                        >
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
                  );
                })}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  ); //onDragEnd==유저가 드래그를 끝낸 시점에 불려지는 함수
};

export default App;
//draggable == list 의 아이템 children 함수여야함
//droppable == list
