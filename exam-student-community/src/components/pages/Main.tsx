import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import Loading from "../molecules/Loading";
import { authCheck, getBoards, SERVER_URL } from "../../api";
import { useRecoilState } from "recoil";
import { isTopBarOpen, loginState, user } from "../../store/atoms";
import { useState, useEffect } from "react";
import { sampleBoards } from "../molecules/atoms/sampleData";
import { Link } from "react-router-dom";
import SearchBar from "../molecules/SearchBar";
import { useRef } from "react";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userName, setUserName] = useRecoilState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [boardsData, setBoardsData] = useState();
  const [isOpen, setIsOpen] = useRecoilState(isTopBarOpen);

  //다른데 누르면 모달이 닫히게 
  const el:any = useRef();
  const handleCloseModal = (e: any) => {
    if (isOpen && (!el.current || !el.current.contains(e.target))) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("click", handleCloseModal);
    }
  }, [])

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
    };
    checkUserAuth();
    paintBoards();
  }, []);

  console.log(isOpen);

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

