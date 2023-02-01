import { useState } from "react";
import { DropdownBox, Menu } from "./atoms/styled";
import { IconRarr, IconLock, IconPower } from "./atoms/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, user } from "../../store/atoms";
import { Link } from "react-router-dom";
import { logout } from "../../api";

const options = ["기능1", "기능2", "기능3"];
function Dropdown({ isOpen }: any) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const userName = useRecoilValue(user);

  if (!isLoggedIn) {
    return (
      <DropdownBox>
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
    );
  }
  return (
    <DropdownBox>
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
        <Link to="/mycommentposts">
          <Menu>
            <span>{`댓글단 글`}</span>
          </Menu>
        </Link>
        <Link to="/myscrapposts">
          <Menu>
            <span>{`스크랩한 글`}</span>
          </Menu>
        </Link>
        <Link to="/mypage">
          <Menu>
            <span>{`내 정보 수정`}</span>
          </Menu>
        </Link>
      </ul>
    </DropdownBox>
  );
}

export default Dropdown;
