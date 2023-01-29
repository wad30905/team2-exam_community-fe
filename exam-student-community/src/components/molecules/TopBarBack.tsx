import {
  TopBarBtns,
  TopContainer,
  TopBarMenu,
  TopBarMain,
  TopBarContainer,
} from "./atoms/styled";
import { IconBackBtn, IconBar, IconMoreBtn } from "./atoms/icons";
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

function TopBarBack() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen((current) => !current);

  const onClickLogOut = () => {
    setIsLoggedIn(false);
    logout();
  };

  const onBack = () => {
    navigate(-1);
  };
  const onOptions = () => {
    setIsOptions((current) => !current);
  };

  return (
    <TopBarContainer>
      <TopContainer>
        <TopBarMenu onClick={onBack}>
          <IconBackBtn className="backButton" />
        </TopBarMenu>
        <TopBarMain>
          <Link to="/">코코볼</Link>
        </TopBarMain>
        <TopBarBtns>
          <IconMoreBtn onClick={onOptions} />
        </TopBarBtns>
      </TopContainer>
      <SearchBar placeholder={"검색하시오."} />
    </TopBarContainer>
  );
}

export default TopBarBack;
