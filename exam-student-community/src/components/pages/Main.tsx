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

  //  유저 확인 코드. 들어가야함.
  // 일단 recoil로 구현.
  // 추후 authCheck api 가져와서 하기.
  // api 동작하는지 확인 필요.
  // useEffect(() => {
  //   authCheck();
  // }, []);

  return (
    <>
      <TopBar
        // isLoggedIn={isLoggedIn}
        // setIsLoggedIn={setIsLoggedIn}
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