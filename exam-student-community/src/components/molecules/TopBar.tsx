import {
  TopBarBtns,
  TopContainer,
  TopBarMenu,
  TopBarMain,
} from "./atoms/styled";
import { IconBar } from "./atoms/icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
interface ITopBarProps {
  toggle: VoidFunction;
  mainService: string;
  needWrite: boolean;
}

function TopBar({ toggle, mainService, needWrite }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const onClickLogOut = () => {
    setIsLoggedIn(false);
    Cookies.remove("COOKIE_KEY");
  };
  return (
    <TopContainer>
      <TopBarMenu onClick={toggle}>
        <IconBar />
      </TopBarMenu>
      <TopBarMain>
        <Link to="/">{mainService}</Link>
      </TopBarMain>
      {isLoggedIn ? (
        <TopBarBtns onClick={onClickLogOut}>
          {needWrite ? <Link to="/:blogs/write">글쓰기</Link> : null}
          <Link to="/">로그아웃</Link>
        </TopBarBtns>
      ) : (
        <TopBarBtns>
          <Link to="/login">로그인</Link>
        </TopBarBtns>
      )}
    </TopContainer>
  );
}
export default TopBar;
