/* eslint-disable import/no-unresolved, quotes, semi, no-unused-vars, comma-dangle */

import styled from "styled-components";
import { memo } from "react";

const ItemContainer = styled.div`
  margin-top: 40px;
`;

const Topic = styled.div`
  font-size: 20px;
  display: flex;
  margin-bottom: 18px;

  ${(props) =>
    props.$topicDiscription &&
    `
    margin-bottom: 5px;
  `}
`;

const Required = styled.div`
  color: #e74149;
  font-size: 20px;
  margin-left: 6px;
`;

const TopicDescription = styled.div`
  margin-bottom: 18px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 287px;
  height: 23px;
  border: 1px solid #d0d0d0;

  ::placeholder {
    font-size: 16px;
    color: #afafaf;
  }
`;

const Radio = styled.div`
  input {
    margin-bottom: 20px;
  }
`;

const ErrorMessage = styled.div`
  color: #e74149;
  font-size: 14px;
  margin-top: 10px;
`;

function FormItem({
  item,
  handleInputChange,
  handleInputFocus,
  validInput,
  invalidInputRef,
  scrollToInvalidInput,
  inputData,
}) {
  const {
    name,
    topic,
    topicDescription,
    placeholder,
    type,
    required,
    options,
  } = item;

  return (
    <ItemContainer ref={scrollToInvalidInput ? invalidInputRef : null}>
      <Topic $topicDiscription={topicDescription}>
        {topic}
        {required && <Required>*</Required>}
      </Topic>
      {topicDescription && (
        <TopicDescription>{`${topicDescription}`}</TopicDescription>
      )}
      {type === "text" && (
        <Input
          placeholder={placeholder}
          name={name}
          type={type}
          onChange={handleInputChange}
          value={inputData}
          onFocus={handleInputFocus}
        />
      )}
      {type === "radio" && (
        <Radio>
          {options.map((option) => {
            const { optionName, optionTopic } = option;
            return (
              <div key={optionName}>
                <input
                  type={type}
                  id={optionName}
                  name={name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <label htmlFor={optionName}> {optionTopic}</label>
                <br />
              </div>
            );
          })}
        </Radio>
      )}
      {required && !validInput && (
        <ErrorMessage>{`請輸入${placeholder}`}</ErrorMessage>
      )}
    </ItemContainer>
  );
}

export default memo(FormItem);
