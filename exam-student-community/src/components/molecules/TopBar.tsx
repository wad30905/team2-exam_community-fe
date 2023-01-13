import { Search, TopBarBtns, TopContainer, TopBarMenu, TopBarMain } from "./atoms/styled";
import { IconBar, IconSearch } from "./atoms/icons";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";

interface ITopBarProps {
  mainService: String;
  needWrite: Boolean,
  needSearch: Boolean,
}

function TopBar({ mainService, needWrite, needSearch }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const onClickLogOut = () => {
    setIsLoggedIn(false);
  };
  const toggle = () => setIsOpen(!isOpen);
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
            {needWrite ? <Link to="/blogs/write" >글쓰기</Link> : null}
            <Link to="/">로그아웃</Link>
          </TopBarBtns>
        ) : (
          <TopBarBtns>
            <Link to="/login">로그인</Link>
          </TopBarBtns>
        )}
      </TopContainer>
      {needSearch ? <SearchBar placeholder={"asdf"} /> : null}
      {isOpen && <Dropdown isLoggedIn={isLoggedIn} />}
    </>
  );
}

export default TopBar;