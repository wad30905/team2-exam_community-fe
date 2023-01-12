import { Search, TopBarBtns, TopContainer, TopBarMenu, TopBarMain } from "./atoms/styled";
import { IconBar, IconSearch } from "./atoms/icons";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";

import styled from "styled-components";
interface ITopBarProps {
  toggle: VoidFunction;
  mainService: string;
  needWrite: boolean;
}

function TopBar({ toggle, mainService, needWrite }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const onClickLogOut = () => {
    setIsLoggedIn(false);
    // const isLoggedInPromise = new Promise((resolve, reject) => {
    //   resolve(isLoggedIn);
    // });
    // isLoggedInPromise
    //   .then((value) => !value)
    //   .then((value) => {
    //     setIsLoggedIn(value);
    //     return value;
    //   })
    //   .then((value) => console.log(value));
  };
  return (
    <TopContainer>
      <TopBarMenu onClick={toggle}>
        <IconBar />
      </TopBarMenu>
      <TopBarMain>
        <Link to="/">{mainService}</Link>
      </TopBarMain>
      {isLoggedIn ? (
        <TopBarBtns onClick={onClickLogOut}>
          {needWrite ? <Link to="/:blogs/write" >글쓰기</Link> : null}
          <Link to="/">로그아웃</Link>
        </TopBarBtns>
      ) : (
        <TopBarBtns>
          <Link to="/login">로그인</Link>
        </TopBarBtns>
      )}
    </TopContainer>
  );
}

export default TopBar;
