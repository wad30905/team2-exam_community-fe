import { useEffect, useState } from "react";
import Dropdown from "../molecules/Dropdown";
import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import { authCheck, fetchBoards, SERVER_URL } from "../../api";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import SearchBar from "../molecules/SearchBar";
import { useQuery } from "react-query";
import { Loader } from "../molecules/atoms/styled";
import Loading from "../molecules/Loading";

export interface IPost {
  id: Number,
  title: String,
  comment_num: Number,
  click_num: Number,
  writer: String,
  m_date: Date,
  d_date: Date,
};

export interface IBoards{
  index: Number,
  name: String,
  total_num: Number,
  posts: IPost[]
};

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["userName"];
      setIsLoggedIn(authStatus);
      setUsername(authName);
      setIsLoading(false);
    };
    checkUserAuth();
  }, []);


  const onClickApi = () => {
    console.log("api 실행");

    axios({
      method: "post",
      url: `${SERVER_URL}/test`,
      data: {
        test: 1,
        data: "data",
      },
    }).then((res) => {
      console.log("res : ", res);
      console.log("res.data : ", res.data);
    });
  };
  return (
    <>
      <TopBar
        mainService={"서비스명"}
        needWrite={isLoggedIn ? true : false}
        needSearch={true}
        userName={userName}
      />
    </>
  );
}

export default Main;
