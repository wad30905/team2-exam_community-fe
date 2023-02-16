import { useEffect, useState } from "react";
import { DropdownBox, Menu } from "./atoms/styled";
import { IconRarr, IconLock, IconPower } from "./atoms/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, user } from "../../store/atoms";
import { Link } from "react-router-dom";
import { logout } from "../../api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const notLoggedInoptions = ["기능1", "기능2", "기능3", "기능4"];
const loggedInOptions = {
  "내 프로필": "myprofile",
  "내가 쓴 글": "myposts",
  "내가 좋아요한 글": "mylikeposts",
  "공부시간 재기": "timer",
};
const Dropdown: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const modal = event.target as HTMLElement;
      if (modal.className === "modal-overlay") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, onClose]);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const userName = useRecoilValue(user);

  if (!isLoggedIn) {
    return (
      <div>
        {isOpen && (
          <div className="modal-overlay">
            <DropdownBox className="modal-content">
              <ul
                className={
                  isOpen ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
                }
              >
                <div className="title">
                  <span>
                    <IconPower />
                  </span>
                  <span>로그인해주세요</span>
                </div>
                {isOpen &&
                  notLoggedInoptions.map((option, index) => (
                    <Menu style={{ color: "gray" }} key={index}>
                      <span>{option}</span>
                      <span>
                        <IconLock />
                      </span>
                    </Menu>
                  ))}
              </ul>
            </DropdownBox>
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <DropdownBox className="modal-content">
            <ul
              className={
                isOpen ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
              }
            >
              <div className="title">
                <span>{userName}님 환영합니다</span>
              </div>
              {Object.entries(loggedInOptions).map(([option, url]) => (
                <Link to={`/${url}`} key={option}>
                  <Menu>
                    <span>{option}</span>
                  </Menu>
                </Link>
              ))}
            </ul>
          </DropdownBox>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
