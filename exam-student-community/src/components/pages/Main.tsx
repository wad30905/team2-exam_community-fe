import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import Loading from "../molecules/Loading";
import { authCheck, getBoards, SERVER_URL } from "../../api";
import { useRecoilState } from "recoil";
import { loginState, user } from "../../store/atoms";
import { useState, useEffect } from "react";
import { sampleBoards } from "../molecules/atoms/sampleData";
import { Link } from "react-router-dom";
import SearchBar from "../molecules/SearchBar";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userName, setUserName] = useRecoilState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [boardsData, setBoardsData] = useState();

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUserName(authName);
      setIsLoading(false);
    };
    const paintBoards = async () => {
      const boardsData = await getBoards();
      setBoardsData(boardsData);
      console.log("boardsData:", boardsData);
    };
    checkUserAuth();
    paintBoards();
  }, []);

  return !isLoading ? (
    <>
      <TopBar
        id={undefined}
        mainService={"코코볼"}
        needWrite={true}
        needSearch={true}
      />
      <Boards data={boardsData} />
    </>
  ) : (
    <Loading />
  );
}

export default Main;
