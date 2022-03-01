/* eslint-disable import/no-unresolved, quotes, semi, no-unused-vars, comma-dangle */

import { useState, useRef, useCallback } from "react";
import useInput from "./useInput";

export default function useTodos() {
  const {
    todoInput,
    setTodoInput,
    setEditingTodo,
    setErrorMessage,
    errorMessage,
    editingTodo,
    editTodoInput,
    handleInputChange,
    handleInputFocus,
    handleEditTodo,
    handleEditTodoInputChange,
  } = useInput();
  const [todos, setTodos] = useState([]);
  const id = useRef(1);

  const handleAddTodo = useCallback(() => {
    if (todoInput === "") {
      setErrorMessage("請輸入待辦事項！");
      return;
    }
    setTodos([
      ...todos,
      {
        id: id.current,
        content: todoInput,
        isCompleted: false,
      },
    ]);

    id.current++;
    setTodoInput("");
  }, [todoInput, setTodoInput, setErrorMessage, todos]);

  const handleFinishEditTodo = useCallback(
    (id, content) => {
      if (content === "") {
        return;
      }

      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              content,
            };
          }
          return todo;
        })
      );
      setEditingTodo(0);
    },
    [todos, setEditingTodo]
  );

  const handleToggleIsCompleted = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted,
            };
          }
          return todo;
        })
      );
    },
    [todos]
  );

  const handleDeleteTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const handleDeleteAllTodos = useCallback(() => {
    setTodos([]);
  }, []);

  return {
    todos,
    todoInput,
    setTodos,
    handleAddTodo,
    handleFinishEditTodo,
    handleToggleIsCompleted,
    handleDeleteTodo,
    errorMessage,
    editingTodo,
    editTodoInput,
    handleInputChange,
    handleInputFocus,
    handleEditTodo,
    handleEditTodoInputChange,
    handleDeleteAllTodos,
  };
}
