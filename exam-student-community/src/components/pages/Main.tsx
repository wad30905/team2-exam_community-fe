import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import { authCheck, fetchBoards, SERVER_URL } from "../../api";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { sampleBlogs, sampleBoards } from "../molecules/atoms/sampleData";
import { Loader } from "../molecules/atoms/styled";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [userName, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [boardsData, setBoardsData] = useState();

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["userName"];
      setIsLoggedIn(authStatus);
      setUsername(authName);
      setIsLoading(false);
    };
    const getBoards = async () => {
      const boardsData = await fetchBoards();
      setBoardsData(boardsData);
    };
    checkUserAuth();
    getBoards();
  }, []);
  return (
    <>
      <TopBar mainService={"서비스명"} needWrite={true} needSearch={true} />
      {/* {isLoading ? null : <Boards data={sampleBoards}} */}
      <Boards data={boardsData} />
    </>
  );
}

export default Main;
