/* eslint-disable import/no-unresolved, quotes, semi, no-unused-vars, comma-dangle */

import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Todo = styled.div`
  width: 90%;
  margin: 0 auto;
  border: 2px dashed DarkSeaGreen;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: Whitesmoke;
  border-radius: 5px;
  height: 60px;
  & + & {
    margin-top: 15px;
  }

  ${(props) =>
    props.$isCompleted &&
    `
    background: Silver;
    border-color: DimGray;
  `}
`;

const TodoContent = styled.div`
  font-size: 20px;
  color: DarkOliveGreen;
  letter-spacing: 1.5px;
  margin-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) =>
    props.$isCompleted &&
    `
    text-decoration: line-through;
  `}
`;

const EditTodoContent = styled.input`
  font-size: 20px;
  color: DarkOliveGreen;
  letter-spacing: 1.5px;
  margin-left: 20px;
  width: 65%;
`;

const TodoButtons = styled.div`
  display: flex;
`;

const TodoButton = styled.button`
  text-decoration: none;
  background: none;
  color: whitesmoke;
  border-radius: 5px;
  background: DarkSeaGreen;
  height: 40px;
  margin-right: 15px;
  width: 70px;
  letter-spacing: 1.5px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    color: DarkSlateGray;
  }

  ${(props) =>
    props.$isCompleted &&
    `
    background: DimGray;

    :hover {
      color: DarkSeaGreen;
    }
  `}
`;

const RedTodoButton = styled(TodoButton)`
  background: LightCoral;
  letter-spacing: 5px;

  :hover {
    color: Maroon;
  }
`;

const EditTodoButton = styled(RedTodoButton)`
  background: Tan;

  :hover {
    color: Chocolate;
  }
`;

const FinishEditTodoButton = styled(EditTodoButton)`
  background: DarkKhaki;
`;

function TodoItem({
  todo,
  handleToggleIsCompleted,
  handleDeleteTodo,
  handleFinishEditTodo,
  isEditing,
  handleEditTodo,
  editTodoInput,
  handleEditTodoInputChange,
}) {
  const { id, content, isCompleted } = todo;

  return (
    <Todo $isCompleted={isCompleted}>
      {!isEditing && (
        <TodoContent $isCompleted={isCompleted}>{content}</TodoContent>
      )}
      {isEditing && (
        <EditTodoContent
          value={editTodoInput}
          onChange={handleEditTodoInputChange}
        />
      )}
      <TodoButtons>
        {!isEditing && (
          <EditTodoButton
            onClick={() => {
              handleEditTodo(id, content);
            }}
          >
            編輯
          </EditTodoButton>
        )}
        {isEditing && (
          <FinishEditTodoButton
            onClick={() => {
              handleFinishEditTodo(id, editTodoInput);
            }}
          >
            完成
          </FinishEditTodoButton>
        )}
        <TodoButton
          $isCompleted={isCompleted}
          onClick={() => {
            handleToggleIsCompleted(id);
          }}
        >
          {isCompleted ? "未完成" : "已完成"}
        </TodoButton>
        <RedTodoButton onClick={() => handleDeleteTodo(id)}>刪除</RedTodoButton>
      </TodoButtons>
    </Todo>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isCompleted: PropTypes.bool,
  }),
  editTodoInput: PropTypes.string,
  isEditing: PropTypes.bool,
  handleToggleIsCompleted: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
  handleEditTodo: PropTypes.func,
  handleEditTodoInputChange: PropTypes.func,
  handleFinishEditTodo: PropTypes.func,
};

export default memo(TodoItem);
