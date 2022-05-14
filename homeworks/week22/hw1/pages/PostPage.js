/* eslint-disable import/no-unresolved, no-unused-vars, import/extensions, quotes, semi */

import { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import { getPost } from "../../WebAPI";

const Root = styled.div`
  display: flex;
  padding: 50px 0px 0px 7%;
`;

const PostContainer = styled.div`
  width: 75%;
  margin-bottom: 70px;
`;

const Post = styled.div`
  padding: 30px 0px 45px 75px;
  width: 90%;
  box-sizing: border-box;
`;

const PostTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #391d46;
`;

const PostDate = styled.div`
  letter-spacing: 1px;
  margin-bottom: 30px;
  color: #701f74;
  font-size: 16px;
`;

const PostContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 18px;
  letter-spacing: 1px;
  line-height: 30px;
  color: #391d46;
`;

const Loading = styled.div`
  width: 100%;
  height: 400px;
  background: #e8e5f8;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  padding-top: 50px;
  letter-spacing: 3px;
`;

function PostPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState();

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPost(id)
      .then((data) => {
        // 找不到資料會回傳空物件
        if (JSON.stringify(data) === "{}") {
          setError("postId");
          return;
        }
        setPostData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("API");
      });
  }, [id]);

  return (
    <Root>
      <SideBar />
      <PostContainer>
        {error && (
          <ErrorBlock size="big">
            {error === "postId" ? "找不到文章 QQ" : "資料錯誤，請稍後再試"}
          </ErrorBlock>
        )}
        {!error && (
          <GeneralBlock
            title={postData ? postData.user.nickname : ""}
            full={true}
          >
            {isLoading && <Loading>Loading...</Loading>}
            {!isLoading && postData && (
              <Post>
                <PostTitle>{postData.title}</PostTitle>
                <PostDate>
                  {new Date(postData.createdAt).toLocaleString()}
                </PostDate>
                <PostContent>
                  {parse(DOMPurify.sanitize(postData.body))}
                </PostContent>
              </Post>
            )}
          </GeneralBlock>
        )}
      </PostContainer>
    </Root>
  );
}

export default memo(PostPage);
