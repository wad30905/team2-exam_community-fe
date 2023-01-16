import {
  TopBarBtns,
  TopContainer,
  TopBarMenu,
  TopBarMain,
} from "./atoms/styled";
import { IconBar } from "./atoms/icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { authCheck, fetchBoards, SERVER_URL } from "../../api";

interface ITopBarProps {
  mainService: String;
  needWrite: Boolean;
  needSearch: Boolean;
  userName: String;
}

function TopBar({ mainService, needWrite, needSearch }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((current) => !current);
  const [isLoading0, setIsLoading] = useState(true);
  const [userName, setUsername] = useState("");
  // console.log(isOpen);

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["userName"];
      setIsLoggedIn(authStatus);
      setUsername(authName);
      setIsLoading(false);
    };
    checkUserAuth();
  }, []);

  const onClickLogOut = () => setIsLoggedIn(false);
  return (
    <>
      <TopContainer>
        <TopBarMenu onClick={toggle}>
          <IconBar />
        </TopBarMenu>
        <TopBarMain>
          <Link to="/">{mainService}</Link>
        </TopBarMain>
        {isLoggedIn ? (
          <TopBarBtns onClick={onClickLogOut}>
            {needWrite ? <Link to="/blogs/write">글쓰기</Link> : null}
            <Link to="/">로그아웃</Link>
          </TopBarBtns>
        ) : (
          <TopBarBtns>
            <Link to="/login">로그인</Link>
          </TopBarBtns>
        )}
      </TopContainer>
      {needSearch ? <SearchBar placeholder={"asdf"} /> : null}
      {isOpen ? <Dropdown /> : null}
    </>
  );
}

export default TopBar;
