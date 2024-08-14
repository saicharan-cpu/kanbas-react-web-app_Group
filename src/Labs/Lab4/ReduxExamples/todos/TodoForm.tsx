import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <li className="list-group-item form-item">
      <input
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="form-control"
      />
      <div className="button-group">
        <button onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click" className="btn btn-add"> Add </button>
        <button onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click" className="btn btn-update"> Update </button>
      </div>
    </li>
  );
}
