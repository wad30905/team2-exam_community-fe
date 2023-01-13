import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "../molecules/Dropdown";
import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import { authCheck, SERVER_URL } from "../../api";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <TopBar
        toggle={toggle}
        mainService={"서비스명"}
        needWrite={isLoggedIn ? true : false}
      />
      {isOpen && <Dropdown isLoggedIn={isLoggedIn} />}
      <Boards />
    </>
  );
}

export default Main;
