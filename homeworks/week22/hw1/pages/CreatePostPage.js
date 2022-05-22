/* eslint-disable import/no-unresolved, no-unused-vars, import/extensions, quotes, semi */

import styled from "styled-components";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SideBar from "../../component/SideBar";
import { GeneralBlock } from "../../component/Blocks";
import { AuthContext } from "../../context";
import { createPost } from "../../WebAPI";

const Root = styled.div`
  padding: 50px 0px 0px 7%;
  display: flex;
`;

const CreatePostContainer = styled.div`
  width: 75%;
  margin-bottom: 60px;
`;

const CreatePost = styled.div`
  padding: 40px 5% 30px 7%;
  width: 90%;
`;

const PostTitle = styled.div`
  width: 93%;
  height: 35px;
  margin-bottom: 45px;

  input {
    height: 100%;
    width: 100%;
    font-size: 16px;

    ::placeholder {
      color: #757575;
    }
  }
`;

const SubmitButton = styled.div`
  display: flex;
  margin: 20px 0px 0px 84%;
  background: #9c7391;
  color: white;
  border-radius: 3px;
  padding: 12px 0px 12px 5px;
  width: 10%;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 8px;
  font-weight: bold;

  :hover {
    background: #301945;
  }
`;

const CKEditorContainer = styled.div`
  width: 95%;
  .ck-editor {
    .ck-editor__main {
      .ck-content {
        height: 500px;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: Red;
  margin: 8px 0px 0px 7px;
  font-weight: bold;
`;

function CreatePostPage() {
  const editorDataRef = useRef();
  const scrollIntoViewRef = useRef();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmitPost = () => {
    setErrorMessage(null);
    if (!title || !editorDataRef.current.getData()) {
      setErrorMessage("標題與內文不可為空");
      scrollIntoViewRef.current.scrollIntoView();
      return;
    }

    createPost(title, editorDataRef.current.getData()).then((data) => {
      if (data.ok === 0) {
        setErrorMessage(data.message);
        // `code: 1` 代表使用者沒有發文權限
        if (data.code === 1) {
          setUser(null);
          navigate("/");
        }
        return;
      }
      if (data.id) {
        navigate(`/Post/${data.id}`);
      }
    });
  };

  const handlePostTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    setErrorMessage(false);
  }, []);

  return (
    <Root>
      <SideBar />
      <CreatePostContainer>
        <GeneralBlock title="發布文章" titleWidth="160px">
          <CreatePost ref={scrollIntoViewRef}>
            <PostTitle>
              <input
                placeholder=" 請輸入文章標題"
                onChange={handlePostTitle}
                value={title}
                onFocus={handleFocus}
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </PostTitle>
            <CKEditorContainer>
              <CKEditor
                editor={ClassicEditor}
                config={{ placeholder: "請輸入文章內容" }}
                onReady={(editor) => {
                  editorDataRef.current = editor;
                }}
                onFocus={handleFocus}
              />
            </CKEditorContainer>
            <SubmitButton onClick={handleSubmitPost}>發佈</SubmitButton>
          </CreatePost>
        </GeneralBlock>
      </CreatePostContainer>
    </Root>
  );
}

export default CreatePostPage;
