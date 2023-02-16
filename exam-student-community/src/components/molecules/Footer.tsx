import React from "react";
import { FooterContainer } from "./atoms/styled";

const Footer = () => {
  return (
    <>
      <hr style={{ color: "#fafafa", margin: "0 10px" }} />
      <FooterContainer>
        <p>피드백 & 문의는 아래로 연락주세요 !</p>
        <a href="https://open.kakao.com/o/staIy72e" target={"_blank"}>
          {"    https://open.kakao.com/o/staIy72e "}
        </a>
      </FooterContainer>
    </>
  );
};

export default Footer;
