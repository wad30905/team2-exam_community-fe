import {
  TopBarBtns,
  TopContainer,
  TopBarMenu,
  TopBarMain,
} from "./atoms/styled";
import { IconBar } from "./atoms/icons";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, user } from "../../store/atoms";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";

interface ITopBarProps {
  mainService: String;
  needWrite: Boolean;
  needSearch: Boolean;
}

function TopBar({ mainService, needWrite, needSearch }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((current) => !current);
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
      {needSearch ? <SearchBar placeholder={"검색하시오."} /> : null}
      {isOpen ? <Dropdown /> : null }
    </>
  );
}

export default TopBar;
