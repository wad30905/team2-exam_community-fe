import { loginState } from "../../store/atoms";
import { useRecoilState } from "recoil";

function Practice() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  console.log("isLoggedIn : ", isLoggedIn);

  return <>연습페이지</>;
}

export default Practice;
