import { Bar, Search } from "./atoms/styled";
import { IconSearch, IconBar } from "./atoms/icons";

import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";

interface ITopBarProps {
  toggle: VoidFunction;
}

function TopBar({ toggle }: ITopBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  const onClickLogOut = () => {
    setIsLoggedIn(false);
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
          <Link to="/">서비스명</Link>
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
