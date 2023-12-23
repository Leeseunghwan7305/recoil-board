import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { atomTodo, ITodo, IToDoState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stringify } from "querystring";
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
  toDos: ITodo[];
  boardID: string;
}
interface IForm {
  toDo: string;
}
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  width: 80%;
`;
const Board = ({ toDos, boardID }: IBoardProps) => {
  const [Todo, setTodo] = useRecoilState(atomTodo);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!localStorage.getItem("Todo")) return;
    let list = JSON.parse(localStorage.getItem("Todo")!) as IToDoState;

    setTodo(() => {
      return list;
    });
  }, []);
  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    localStorage.setItem(
      "Todo",
      JSON.stringify({
        ...Todo,
        [boardID]: [...Todo[boardID], newTodo],
      })
    );
    setTodo((allBoards) => {
      return { ...allBoards, [boardID]: [...allBoards[boardID], newTodo] };
    });

    setValue("toDo", "");
  };

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
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardID}`}
        />
      </Form>
      <Droppable droppableId={boardID}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
