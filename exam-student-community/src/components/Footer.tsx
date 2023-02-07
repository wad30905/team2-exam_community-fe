import React from "react";
import { FooterContainer } from "./molecules/atoms/styled";

const Footer = () => {
  return (
    <>
      <hr style={{ color: "#fafafa", margin: "0 10px" }} />
      <FooterContainer>
        <p>Contact us : </p>
        <a href="https://open.kakao.com/o/staIy72e" target={"_blank"}>
          {"    https://open.kakao.com/o/staIy72e "}
        </a>
      </FooterContainer>
    </>
  );
};

export default Footer;
