import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "../molecules/Dropdown";
import TopBar from "../molecules/TopBar";
import Boards from "../molecules/Boards";
import { authCheck, SERVER_URL } from "../../api";
import axios from "axios";

function Main() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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

  //  유저 확인 코드.
  // 일단 localStorage 로 야매로 구현
  // 추후 authCheck api 가져와서 하기.
  // api 동작하는지 확인 필요.
  useEffect(() => {
    console.log("useEffect 실행");
    console.log("location :", location.state);
    if (location.state) {
      setIsLoggedIn(location.state.isLoggedIn);
    } else {
      const isTrueSet = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isTrueSet);
    }
    // -----------------------------------------
    // 진짜 코드
    // setIsLoggedIn(authCheck);
  }, []);

  return (
    <>
      <button onClick={onClickApi}>API 실행</button>
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
