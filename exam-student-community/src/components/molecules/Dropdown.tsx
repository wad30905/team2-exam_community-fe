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

const options = ["기능1", "기능2", "기능3"];
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
                  options.map((option, index) => (
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
              <Link to="/myposts">
                <Menu>
                  <span>{`내가 쓴 글`}</span>
                </Menu>
              </Link>
              {/* <Link to="/mylikeposts">
              <Menu>
                <span>{`좋아요한 글`}</span>
              </Menu>
            </Link>
            <Link to="/myscrapposts">
              <Menu>
                <span>{`스크랩한 글`}</span>
              </Menu>
            </Link> */}
              <Link to="/mypage">
                <Menu>
                  <span>{`내 정보 수정`}</span>
                </Menu>
              </Link>
            </ul>
          </DropdownBox>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
