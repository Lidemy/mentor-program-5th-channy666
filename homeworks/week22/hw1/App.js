/* eslint-disable import/no-unresolved, no-unused-vars, import/extensions, quotes, semi, comma-dangle */

import styled from "styled-components";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import CreatePostPage from "./pages/CreatePostPage";
import LogInPage from "./pages/LogInPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthContext } from "./context";
import { getAuthToken, setAuthToken } from "./utils/authorization";
import { getMe } from "./WebAPI";

const Wrapper = styled.div`
  min-height: 600px;
  min-width: 1200px;
`;

const Warning = styled.div`
  height: 35px;
  width: 100%;
  text-align: center;
  padding-top: 10px;
  background: #c2c3de;
  color: black;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 3px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const WarningLink = styled.a`
  color: Crimson;

  :hover {
    color: #861587;
  }
`;

function App() {
  const [user, setUser] = useState("comfirming");

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((res) => {
        if (res.ok === 1) {
          return setUser(res.data);
        }
        setUser(null);
        setAuthToken(null);
      });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Wrapper>
        <Router>
          <Warning>
            {`注意！本網站為練習用網站，欲前往清華大學區塊鏈法律與政策研究中心 `}
            <WarningLink
              href="https://www.facebook.com/BlockchainLawcenter/"
              target="_blank"
            >
              請按此
            </WarningLink>
          </Warning>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Posts" element={<PostsPage />} />
            <Route path="/Post/:id" element={<PostPage />} />
            <Route path="/ContactUs" element={<ContactUsPage />} />
            <Route path="/CreatePost" element={<CreatePostPage />} />
            <Route path="/Login" element={<LogInPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
      </Wrapper>
    </AuthContext.Provider>
  );
}

export default App;
