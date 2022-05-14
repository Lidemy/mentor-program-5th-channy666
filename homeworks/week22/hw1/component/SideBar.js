/* eslint-disable import/no-unresolved, no-unused-vars, quotes, semi */

import styled from "styled-components";
import { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { GeneralBlock, ErrorBlock } from "./Blocks";
import { getLatestPosts } from "../WebAPI";

const SideBarContainer = styled.div`
  width: 18%;
  margin-right: 4%;
`;

const ClassificationContainer = styled.div`
  height: 250px;
  width: 100%;
`;

const ClassificationContent = styled.div`
  padding: 20px 5% 15px 13%;
`;

const Classification = styled.div`
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  line-height: 50px;
  margin-bottom: 20px;

  :hover {
    cursor: not-allowed;
    text-decoration: underline;
  }
`;

const RecentPosts = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const RecentPostContent = styled.div`
  padding: 25px 8% 0 8%;
  display: flex;
  flex-direction: column;
`;

const RecentPost = styled(Link)`
  height: 50px;
  margin-bottom: 25px;
  overflow: scroll;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  text-decoration: none;
  color: black;

  :hover {
    text-decoration: underline;
  }
`;

function SideBar() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getLatestPosts()
      .then((data) => setLatestPosts(data))
      .catch((err) => {
        setError(true);
      });
  }, []);

  return (
    <SideBarContainer>
      <ClassificationContainer>
        <GeneralBlock title="研究觀點分類" titleWidth="170px">
          <ClassificationContent>
            <Classification>金融科技</Classification>
            <Classification>一般產業</Classification>
          </ClassificationContent>
        </GeneralBlock>
      </ClassificationContainer>
      <RecentPosts>
        {error && <ErrorBlock size="small">資料錯誤，請稍後再試</ErrorBlock>}
        {!error && (
          <GeneralBlock title="近期文章" titleWidth="130px">
            <RecentPostContent>
              {latestPosts.map((post) => (
                <RecentPost key={post.id} to={`/Post/${post.id}`}>
                  {post.title}
                </RecentPost>
              ))}
            </RecentPostContent>
          </GeneralBlock>
        )}
      </RecentPosts>
    </SideBarContainer>
  );
}

export default memo(SideBar);
