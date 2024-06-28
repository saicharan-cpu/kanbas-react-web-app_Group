import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
  };
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> Edit </button>
      {todo.title}
    </li>
  );
}
