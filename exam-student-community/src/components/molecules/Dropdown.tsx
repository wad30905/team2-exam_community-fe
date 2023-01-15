import { useState } from "react";
import { DropdownBox, Menu } from "./atoms/styled";
import { IconRarr, IconLock, IconPower } from "./atoms/icons";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { useEffect } from "react";
import { authCheck } from "../../api";
const options = ["기능1", "기능2", "기능3"];

function Dropdown() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoading0, setIsLoading] = useState(true);
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
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return (
      <DropdownBox>
        <div className="title">
          <span>
            <IconPower />
          </span>
          <span>로그인해주세요</span>
        </div>
        <ul>
          {options.map((option, index) => (
            <Menu style={{ color: "gray" }} key={index}>
              <span>{option}</span>
              <span>
                <IconLock />
              </span>
            </Menu>
          ))}
        </ul>
      </DropdownBox>
    );
  }
  return (
    <DropdownBox>
      <h1 className="title">
        <span>{userName}님 환영합니다</span>
      </h1>
      <ul>
        {options.map((option, index) => (
          <Menu key={index}>
            <span>{option}</span>
            <span>
              <IconRarr />
            </span>
          </Menu>
        ))}
      </ul>
    </DropdownBox>
  );
}

export default Dropdown;
