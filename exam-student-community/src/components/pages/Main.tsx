import { useEffect, useState } from "react";
import Dropdown from "../molecules/Dropdown";
import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import { authCheck } from "../../api";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import Loading from "../molecules/Loading";

function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUsername(authName);
      setIsLoading(false);
    };
    checkUserAuth();
  }, []);

  return (
    <>
      <TopBar
        toggle={toggle}
        mainService={"서비스명"}
        needWrite={isLoggedIn ? true : false}
      />
      {isOpen && <Dropdown username={username} isLoggedIn={isLoggedIn} />}
      <Boards />
    </>
  );
}

export default Main;
