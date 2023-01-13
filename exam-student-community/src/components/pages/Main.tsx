import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "../molecules/Dropdown";
import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import { authCheck, SERVER_URL } from "../../api";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import Cookies from "js-cookie";

function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserAuth = async () => {
    const authStatus = await authCheck();
    console.log("atuhStatus : ", authStatus);
    setIsLoggedIn(authStatus);
    const value = Cookies.get("COOKIE_KEY");
    console.log("COOKIE_KEY : ", value);
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  // const COOKIE_KEY = window.user;

  return (
    <>
      ``
      {isLoggedIn ? "유저다" : "유저아니다"}
      <TopBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        toggle={toggle}
      />
      {isOpen && <Dropdown isLoggedIn={isLoggedIn} />}
      <Boards />
    </>
  );
}

export default Main;
