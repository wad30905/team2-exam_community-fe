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
import { loginState, user, userId } from "../../store/atoms";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { logout } from "../../api";

interface ITopBarProps {
  needWrite: boolean;
  needSearch: boolean;
}

function TopBar({ needWrite, needSearch }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginUserId, setLoginUserId] = useRecoilState(userId);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navigate = useNavigate();

  const onClickLogOut = () => {
    setIsLoggedIn(false);
    setLoginUserId("");
    logout();
  };
  return (
    <>
      <TopBarContainer>
        <TopContainer>
          <TopBarMenu>
            <IconBar
              onClick={() => {
                toggleModal();
              }}
              className="iconBar"
            />
          </TopBarMenu>
          <TopBarMain>
            <Link to="/">코코볼</Link>
          </TopBarMain>
          {isLoggedIn ? (
            <TopBarBtns>
              {needWrite ? <Link to="/posts/write">글쓰기</Link> : null}
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
      </TopBarContainer>
      <Dropdown isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
}

export default TopBar;
