/* eslint-disable import/no-unresolved, quotes, semi, no-unused-vars, comma-dangle */

import styled from "styled-components";
import { useEffect, useRef } from "react";
import FormItem from "./FormItem";
import useFormData from "./useFormData";
import formTemplate from "./template";

const Root = styled.div`
  background-color: WhiteSmoke;
  height: 100%;
  width: 1620px;
  margin: 0 auto;
  padding-top: 120px;
`;

const Container = styled.div`
  width: 645px;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 82px;
`;

const Block = styled.div`
  height: 8px;
  width: 100%;
  background: #fad312;
  border: 6px solid #fad312;
  box-sizing: border-box;
`;

const RegisterForm = styled.div`
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 54px 0px 35px 41px;
`;

const Title = styled.div`
  margin: 0 0 30px 3px;
  font-size: 36px;
  font-weight: bold;
  text-align: left;
  color: #000;
`;

const Description = styled.div`
  margin-bottom: 50px;
`;

const Date = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Place = styled(Date)``;

const RequiredWarning = styled.div`
  color: #e74149;
  font-size: 16px;
  margin: 25px 0 5px 0;
`;

const Form = styled.form``;

const FormSubmit = styled.button`
  font-size: 15px;
  background: #fad312;
  border: none;
  border-radius: 3px;
  width: 92px;
  height: 40px;
  margin-top: 58px;

  :hover {
    font-weight: bold;
    font-size: 18px;
  }
`;

const Reminder = styled(Date)`
  margin: 21px 0 0 0;
`;

const Footer = styled.div`
  width: 100%;
  height: 60px;
  border-top: 3px solid #fad312;
  background: #000000;
  color: #999999;
  font-size: 13px;
  text-align: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

function App() {
  const {
    inputData,
    handleInputChange,
    validInput,
    scrollToInvalidInput,
    handleFormSubmit,
    handleInputFocus,
  } = useFormData();

  const invalidInputRef = useRef();

  useEffect(() => {
    if (scrollToInvalidInput) {
      invalidInputRef.current.scrollIntoView();
    }
  }, [scrollToInvalidInput]);

  return (
    <Root>
      <Container>
        <Block />
        <RegisterForm>
          <Title>新拖延運動報名表單</Title>
          <Description>
            <Date>活動日期：2020/12/10 ~ 2020/12/11</Date>
            <Place>活動地點：台北市大安區新生南路二段1號</Place>
            <RequiredWarning>* 必填</RequiredWarning>
          </Description>
          <Form>
            {formTemplate.map((item) => { /* eslint-disable-line arrow-body-style */
              return (
                <FormItem
                  key={item.name}
                  item={item}
                  handleInputChange={handleInputChange}
                  handleInputFocus={handleInputFocus}
                  validInput={validInput[item.name]}
                  invalidInputRef={invalidInputRef}
                  scrollToInvalidInput={scrollToInvalidInput === item.name}
                  inputData={inputData[item.name]}
                />
              );
            })}
            <FormSubmit onClick={handleFormSubmit}>提交</FormSubmit>
            <Reminder>請勿透過表單送出您的密碼。</Reminder>
          </Form>
        </RegisterForm>
      </Container>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </Root>
  );
}

export default App;
