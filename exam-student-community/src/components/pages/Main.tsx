import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import Loading from "../molecules/Loading";
import { authCheck, getBoards, SERVER_URL } from "../../api";
import { useRecoilState } from "recoil";
import { loginState, user } from "../../store/atoms";
import { useState, useEffect } from "react";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [userName, setUserName] = useRecoilState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [boardsData, setBoardsData] = useState();

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["userName"];
      setIsLoggedIn(authStatus);
      setUserName(authName);
      setIsLoading(false);
    };
    const paintBoards = async () => {
      const boardsData = await getBoards();
      setBoardsData(boardsData);
    };
    checkUserAuth();
    paintBoards();
  }, []);

  return !isLoading ? (
    <>
      <TopBar id={undefined} mainService={"서비스명"} needWrite={true} needSearch={true} />
      {/* {isLoading ? null : <Boards data={sampleBoards}} */}
      <Boards data={boardsData} />
      <button>클릭</button>
    </>
  ) : (
    <Loading />
  );
}

export default Main;