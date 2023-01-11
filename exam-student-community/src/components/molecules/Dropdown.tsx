import { useState } from "react";
import { DropdownBox, Menu } from "./atoms/styled";
import { IconRarr, IconLock, IconPower } from "./atoms/icons";

const options = ["기능1", "기능2", "기능3"];

interface IDropdownProps {
  isLoggedIn: Boolean;
}

function Dropdown({ isLoggedIn }: IDropdownProps) {
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
        <span>USER NAME님, 환영합니다</span>
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
