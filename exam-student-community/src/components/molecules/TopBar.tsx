import { Bar, Search } from "./atoms/styled";
import { IconSearch, IconBar } from "./atoms/icons";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import Cookies from "js-cookie";

interface ITopBarProps {
  toggle: VoidFunction;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function TopBar({ toggle, isLoggedIn, setIsLoggedIn }: ITopBarProps) {
  const onClickLogOut = () => {
    setIsLoggedIn(false);
    Cookies.remove("COOKIE_KEY", { path: "/" });
    // const isLoggedInPromise = new Promise((resolve, reject) => {
    //   resolve(isLoggedIn);
    // });
    // isLoggedInPromise
    //   .then((value) => !value)
    //   .then((value) => {
    //     setIsLoggedIn(value);
    //     return value;
    //   })
    //   .then((value) => console.log(value));
  };
  return (
    <Bar>
      <div className="top">
        <span onClick={toggle}>
          <IconBar />
        </span>
        <span className="logo">
          <Link to="/" state={{ isLoggedIn: { isLoggedIn } }}>
            서비스명
          </Link>
        </span>
        {isLoggedIn ? (
          <span onClick={onClickLogOut}>
            <Link to="/">로그아웃</Link>
          </span>
        ) : (
          <span>
            <Link to="/login">로그인</Link>
          </span>
        )}
      </div>
      <Search>
        <input placeholder="검색어를 입력하세요" />
        <button>
          <IconSearch />
        </button>
      </Search>
    </Bar>
  );
}

export default TopBar;
