/* eslint-disable import/no-unresolved, quotes, semi, no-unused-vars, comma-dangle */

import { useState, useCallback } from "react";

export default function useInput() {
  const [todoInput, setTodoInput] = useState("");
  const [editingTodo, setEditingTodo] = useState(0);
  const [editTodoInput, setEditTodoInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = useCallback((e) => {
    setTodoInput(e.target.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const handleEditTodo = useCallback((id, content) => {
    setEditingTodo(id);
    setEditTodoInput(content);
  }, []);

  const handleEditTodoInputChange = useCallback((e) => {
    setEditTodoInput(e.target.value);
  }, []);

  return {
    todoInput,
    errorMessage,
    editingTodo,
    editTodoInput,
    setTodoInput,
    setErrorMessage,
    setEditingTodo,
    handleInputChange,
    handleInputFocus,
    handleEditTodo,
    handleEditTodoInputChange,
  };
}
