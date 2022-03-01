/* eslint-disable import/no-unresolved, quotes, semi, no-unused-vars, comma-dangle */

import styled from "styled-components";
import TodoItem from "./TodoItem";
import useTodos from "./useTodos";
import useFilter from "./useFilter";

const Root = styled.div`
  width: 960px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 48px;
  color: IndianRed;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
`;

const AddTodo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 30px 30px 30px;
  flex-wrap: wrap;
`;

const TodoInput = styled.input`
  width: 75%;
  margin-left: 30px;
  font-size: 18px;
  letter-spacing: 1px;

  ::placeholder {
    color: Silver;
  }
`;

const TodoSubmit = styled.button`
  text-decoration: none;
  font-size: 18px;
  letter-spacing: 5px;
  justify-content: center;
  text-align: center;
  width: 12%;
  color: DarkOliveGreen;
  border: none;
  background: Whitesmoke;
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
  margin-right: 20px;

  :hover {
    background: DarkOliveGreen;
    color: Whitesmoke;
  }
`;

const Filter = styled.div`
  display: flex;
  margin: 30px 0px 16px 60px;
`;

const AllTodos = styled.button`
  color: IndianRed;
  background: none;
  border: none;
  margin-right: 20px;
  font-size: 16px;
  height: 50px;
  width: 80px;
  border-radius: 5px;
  letter-spacing: 3px;
  cursor: pointer;
  font-weight: bold;

  :hover {
    background: DarkOliveGreen;
    color: White;
  }

  ${(props) =>
    props.$active &&
    `
    background: DarkOliveGreen;
    color: white;
  `}
`;

const UncompletedTodos = styled(AllTodos)`
  background: none;
  color: DarkSeaGreen;

  :hover {
    color: white;
    background: DarkSeaGreen;
  }

  ${(props) =>
    props.$active &&
    `
    color: white;
    background: DarkSeaGreen;
  `}
`;

const CompletedTodos = styled(UncompletedTodos)`
  color: DimGray;

  :hover {
    background: DimGray;
  }

  ${(props) =>
    props.$active &&
    `
    background: DimGray;
    color: white;
  `}
`;

const ClearAllTodos = styled(UncompletedTodos)`
  color: LightCoral;

  :hover {
    background: LightCoral;
  }
`;

const TodoContainer = styled.div`
  margin: 0 auto;
`;

const ErrorMessage = styled.div`
  color: LightCoral;
  margin-left: 30px;
  margin-top: 10px;
`;

function App() {
  const {
    todos,
    handleAddTodo,
    todoInput,
    errorMessage,
    handleInputChange,
    handleInputFocus,
    handleToggleIsCompleted,
    handleDeleteTodo,
    handleFinishEditTodo,
    editingTodo,
    handleEditTodo,
    editTodoInput,
    handleEditTodoInputChange,
    handleDeleteAllTodos,
  } = useTodos();
  const { filter, handleFilterClick, filterTodos } = useFilter();

  return (
    <Root>
      <Title>- To-do List -</Title>
      <AddTodo>
        <TodoInput
          onChange={handleInputChange}
          placeholder="To-do"
          value={todoInput}
          onFocus={handleInputFocus}
        />
        <TodoSubmit onClick={handleAddTodo}>新增</TodoSubmit>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </AddTodo>
      <Filter onClick={handleFilterClick}>
        <AllTodos $active={filter === "All"}>全部</AllTodos>
        <UncompletedTodos $active={filter === "Uncompleted"}>
          未完成
        </UncompletedTodos>
        <CompletedTodos $active={filter === "Completed"}>已完成</CompletedTodos>
        <ClearAllTodos onClick={handleDeleteAllTodos}>清空</ClearAllTodos>
      </Filter>
      <TodoContainer>
        {filterTodos(todos).map((todo) => { /* eslint-disable-line arrow-body-style */
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              handleToggleIsCompleted={handleToggleIsCompleted}
              handleDeleteTodo={handleDeleteTodo}
              handleFinishEditTodo={handleFinishEditTodo}
              isEditing={editingTodo === todo.id}
              handleEditTodo={handleEditTodo}
              editTodoInput={editingTodo === todo.id ? editTodoInput : ""}
              handleEditTodoInputChange={handleEditTodoInputChange}
            />
          );
        })}
      </TodoContainer>
    </Root>
  );
}

export default App;
