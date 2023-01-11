import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled.div`
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
  background: white;
`;

const LogoBar = styled.div`
  padding: 15px 0px;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.accentColor};
  a {
    font-size: 18px;
    color: ${(props) => props.theme.bgColor};
  }
`;

const Logo = styled.h3`
  width: 33.3%;
  a {
    font-size: 25px;
    font-weight: bold;
  }
`;

const MenuBtn = styled.a`
  width: 33.3%;
`;

const LogOutBtn = styled.a`
  margin-left: 10px;
`;

const Selector = styled.select`
  margin: 10px;
  display: block;
  height: 5vh;
  width: 40%;
  border-radius: 5px;
  border: 1px solid #aaa;
  margin-left: 5%;
`;

const WriteContents = styled.form``;

const TitleInput = styled.input`
  display: block;
  height: 10vh;
  width: 90%;
  margin: 20px auto;
  font-size: 25px;
  overflow: hidden;
  border: none;
  border-bottom: 1px solid #aaa;
  &:focus {
    outline: none;
  }
`;

const ContentInput = styled.textarea`
  display: block;
  height: 50vh;
  width: 90%;
  margin: 10px auto;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Submit = styled.button`
  background: ${(props) => props.theme.accentColor};
  color: white;
  height: 10vh;
  width: 70%;
  margin: 20px auto;
  display: block;
  border: none;
  font-size: 30px;
`;

function Header() {
  return (
    <div>
      <LogoBar>
        <MenuBtn>
          <Link to={"/"}>메뉴</Link>
        </MenuBtn>
        <Logo>
          <Link to={"/"}>서비스명</Link>
        </Logo>
        <LogOutBtn>
          <Link to={"/"}>로그아웃</Link>
        </LogOutBtn>
      </LogoBar>
    </div>
  );
}

const BlogsList = [
  "게시판1",
  "게시판2",
  "게시판3",
  "게시판4",
  "게시판5",
  "게시판6",
];

function Write() {
  const state = useParams();
  console.log(state);
  return (
    <Container>
      <Header />
      <WriteContents>
        <Selector>
          {BlogsList.map((Blogs) => (
            <option>{Blogs}</option>
          ))}
        </Selector>
        <TitleInput placeholder="제목" required />
        <ContentInput placeholder="내용을 입력하세요." required />
        <Submit>작성 완료</Submit>
      </WriteContents>
    </Container>
  );
}

export default Write;
