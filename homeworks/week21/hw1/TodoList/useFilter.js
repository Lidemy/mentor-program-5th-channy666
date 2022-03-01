/* eslint-disable import/no-unresolved, quotes, semi, no-unused-vars, comma-dangle */

import { useState } from "react";

export default function useFilter() {
  const [filter, setFilter] = useState("All");

  const handleFilterClick = (e) => {
    switch (e.target.innerHTML) {
      case "全部":
        setFilter("All");
        break;
      case "未完成":
        setFilter("Uncompleted");
        break;
      case "已完成":
        setFilter("Completed");
        break;
      // no default
    }
  };

  const filterTodos = (todos) => {
    switch (filter) {
      case "All":
        return todos;
      case "Uncompleted":
        return todos.filter((todo) => !todo.isCompleted);
      case "Completed":
        return todos.filter((todo) => todo.isCompleted);
      // no default
    }
  };

  return {
    filter,
    handleFilterClick,
    filterTodos,
  };
}
