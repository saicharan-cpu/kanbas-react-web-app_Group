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
    <li className="list-group-item todo-item">
      {todo.title}
      <div className="button-group">
        <button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click" className="btn btn-edit"> Edit </button>
        <button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click" className="btn btn-delete"> Delete </button>
      </div>
    </li>
  );
}
