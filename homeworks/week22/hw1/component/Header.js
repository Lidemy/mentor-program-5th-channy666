/* eslint-disable import/no-unresolved, no-unused-vars, import/extensions, quotes, semi */

import styled from "styled-components";
import { useContext, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeaderLogo from "../utils/images/BLPC_Logo_white.png";
import { AuthContext } from "../context";
import { setAuthToken } from "../utils/authorization";

const HeaderContainer = styled.div``;

const HeaderBanner = styled.div`
  background: linear-gradient(to right, #50256c, #2348a0);
  height: 240px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  position: relative;

  img {
    height: 250px;
    width: auto;
    margin-left: 6%;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-self: end;
  border-radius: 5px;
  cursor: not-allowed;
  position: absolute;
  left: 75%;
  bottom: 10%;
  background: #eeeeef;
`;

const Search = styled.div`
  height: 30px;
  width: 9vw;
  border-radius: 5px;
`;

const SearchIcon = styled.div`
  height: 30px;
  width: 30px;
  position: relative;
  padding: 3px;
  box-sizing: border-box;
`;

const SearchIconHead = styled.div`
  background: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 3.5px solid #2348a0;
`;

const SearchIconBody = styled.div`
  height: 3.5px;
  width: 11px;
  transform: rotate(45deg);
  background: #2348a0;
  border-radius: 5px;
  margin-left: 12px;
`;

const SwitchLanguages = styled.div`
  display: flex;
  align-self: end;
  align-items: center;
  cursor: not-allowed;
  position: absolute;
  bottom: 12%;
  right: 4%;
`;

const Language = styled.div`
  display: flex;
  color: white;
  font-size: 14px;
  height: 20px;
  width: 45px;
  justify-content: center;
  align-items: start;

  :hover {
    text-decoration: underline;
  }
`;

const NavBar = styled.div`
  display: flex;
  height: 55px;
  width: 100%;
  background: #e8e5f8;
  justify-content: space-between;
  align-items: center;
`;

const NavBarSite = styled.div`
  display: flex;
  text-align: center;
  margin-left: 5%;
`;

const Nav = styled.div`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  width: 100px;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  text-decoration: none;

  ${(props) =>
    props.$disable &&
    `
    color: #C8C9CA;
    cursor: not-allowed;
  `}

  ${(props) =>
    props.$active &&
    `
    color: #861587;
  `}

  ${(props) =>
    !props.$disable &&
    `
    :hover {
      color: #861587;
    }
  `}
`;

const NavBarUser = styled(NavBarSite)`
  margin-right: 1%;
`;

function Header() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = useCallback(() => {
    setAuthToken("");
    setUser(null);
    navigate("/");
  }, []);

  return (
    <HeaderContainer>
      <HeaderBanner>
        <img src={HeaderLogo} alt="Logo" />
        <SearchBar>
          <Search />
          <SearchIcon>
            <SearchIconHead />
            <SearchIconBody />
          </SearchIcon>
        </SearchBar>
        <SwitchLanguages>
          <Language>繁體</Language>
          <Language>English</Language>
        </SwitchLanguages>
      </HeaderBanner>
      <NavBar>
        <NavBarSite>
          <Nav $active={location.pathname === "/"} as={Link} to="/">
            首頁
          </Nav>
          <Nav $active={location.pathname === "/About"} as={Link} to="/About">
            中心概況
          </Nav>
          <Nav $active={location.pathname === "/Posts"} as={Link} to="/Posts">
            文章列表
          </Nav>
          <Nav $disable={true}>公眾論壇</Nav>
          <Nav
            $active={location.pathname === "/ContactUs"}
            as={Link}
            to="/ContactUs"
          >
            聯絡我們
          </Nav>
        </NavBarSite>
        {user && user !== "comfirming" && (
          <NavBarUser>
            <Nav
              $active={location.pathname === "/CreatePost"}
              as={Link}
              to="/CreatePost"
            >
              發佈文章
            </Nav>
            <Nav onClick={handleLogOut}>登出</Nav>
          </NavBarUser>
        )}
        {!user && (
          <NavBarUser>
            <Nav $active={location.pathname === "/LogIn"} as={Link} to="/LogIn">
              註冊 / 登入
            </Nav>
          </NavBarUser>
        )}
      </NavBar>
    </HeaderContainer>
  );
}

export default memo(Header);
