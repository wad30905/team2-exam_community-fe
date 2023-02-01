import {
  TopBarBtns,
  TopContainer,
  TopBarMenu,
  TopBarMain,
  TopBarContainer,
  DropdownBox,
  Menu,
} from "./atoms/styled";
import { IconBackBtn, IconBar } from "./atoms/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, user } from "../../store/atoms";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { logout } from "../../api";

interface ITopBarProps {
  mainService: string | undefined;
  needWrite: boolean;
  needSearch: boolean;
  id: number | undefined;
}

function TopBar({ mainService, needWrite, needSearch, id }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState<any>(false);
  const navigate = useNavigate();

  const toggle = () => {
    setIsOpen((current: any) => !current);
    // setIsOpen((isOpen: boolean) => {
    //   if (isOpen === true) {
    //     console.log("isOpen true일때, false로 바꾸기");
    //     return !isOpen;
    //   } else {
    //     setTimeout(() => {
    //       console.log("isOpen false일때, true로 바꾸기");
    //       return !isOpen;
    //     }, 5000);
    //   }
    // });
  };

  const onClickLogOut = () => {
    setIsLoggedIn(false);
    logout();
  };
  const onBack = () => {
    navigate(-1);
  };

  return (
    <TopBarContainer>
      <TopContainer>
        <TopBarMenu>
          <IconBar onClick={toggle} className="iconBar" />
        </TopBarMenu>
        <TopBarMain>
          <Link to="/">코코볼</Link>
        </TopBarMain>
        {isLoggedIn ? (
          <TopBarBtns>
            {needWrite ? (
              <Link to="/posts/write" state={{ id }}>
                글쓰기
              </Link>
            ) : null}
            <Link to="/" onClick={onClickLogOut}>
              로그아웃
            </Link>
          </TopBarBtns>
        ) : (
          <TopBarBtns>
            <Link to="/login">로그인</Link>
          </TopBarBtns>
        )}
      </TopContainer>
      {needSearch ? <SearchBar placeholder={"검색하시오."} /> : null}

      {/* <Dropdown
        classname={
          isOpen ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
        }
      /> */}
      {/* <Dropdown isOpen={isOpen} /> */}
      {isOpen ? <Dropdown isOpen={isOpen} /> : null}
    </TopBarContainer>
  );
}

export default TopBar;
