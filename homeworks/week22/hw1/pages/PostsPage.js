/* eslint-disable import/no-unresolved, no-unused-vars, import/extensions, quotes, semi */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GeneralBlock, ErrorBlock } from "../../component/Blocks";
import SideBar from "../../component/SideBar";
import { getPosts, getAllPosts } from "../../WebAPI";
import Paginator from "../../component/Paginator";

const Root = styled.div`
  display: flex;
  padding: 50px 0px 50px 7%;
`;

const PostsContainer = styled.div`
  width: 70%;
  position: relative;
`;

const Posts = styled.div`
  padding: 25px 0px 30px 5%;
`;

const Post = styled(Link)`
  display: flex;
  height: 60px;
  margin-bottom: 25px;
  cursor: pointer;
  text-decoration: none;
  color: black;

  :hover {
    text-decoration: underline;
  }
`;

const PostDate = styled.div`
  font-size: 15px;
  width: 20%;
  display: flex;
  align-self: center;
`;

const PostTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  overflow: scroll;
  text-overflow: ellipsis;
  width: 700px;
  line-height: 25px;
  display: flex;
  align-self: center;
`;

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsError, setPostsError] = useState(false);
  const [totalPageError, setTotalPageError] = useState(false);

  useEffect(() => {
    getPosts(currentPage)
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        setPostsError(true);
      });
  }, [currentPage]);

  useEffect(() => {
    getAllPosts()
      .then((data) => setTotalPage(Math.ceil(data.length / 5)))
      .catch((err) => {
        setTotalPageError(true);
      });
  }, []);

  return (
    <Root>
      <SideBar />
      <PostsContainer>
        {postsError && <ErrorBlock size="big">資料錯誤，請稍後再試</ErrorBlock>}
        {!postsError && (
          <GeneralBlock title="文章列表" titleWidth="130px" full={true}>
            <Posts>
              {posts.map((post) => (
                <Post key={post.id} to={`/post/${post.id}`}>
                  <PostDate>
                    {new Date(post.createdAt).toLocaleString()}
                  </PostDate>
                  <PostTitle>{post.title}</PostTitle>
                </Post>
              ))}
            </Posts>
          </GeneralBlock>
        )}
        {!totalPageError && (
          <Paginator
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        )}
      </PostsContainer>
    </Root>
  );
}

export default PostsPage;
