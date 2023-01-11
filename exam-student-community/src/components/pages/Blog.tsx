import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Blogs from "./Blogs";

const Container = styled.div`
  max-width: 480px;
  height: 100vh;
  /* scroll: auto; */
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

const BlogInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 7vh;
  width: 100%;
  margin: 10px auto;
`;

const ProfilePic = styled.div`
  height: 6vh;
  width: 6vh;
  background: blue;
  margin-right: 10px;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Writer = styled.h3`
  font-size: 20px;
`;

const Details = styled.p`
  font-size: 10px;
  color: #aaa;
`;

const MainContents = styled.div`
  min-height: 30vh;
  padding: 5%;
  width: 100%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid #aaa;
`;
const Title = styled.h3`
  font-weight: bold;
  font-size: 20px;
`;

const Content = styled.div`
  min-height: 18vh;
  p {
    overflow-x: hidden;
    font-size: 15px;
    background: white;
  }
`;
const ContentInfo = styled.p`
  font-weight: lighter;
  font-size: 10px;
  color: #aaa;
`;

const ContentButtons = styled.div`
  height: 5vh;
  display: flex;
  justify-content: start;
`;

const LikeBtn = styled.div`
  width: 6vh;
  background: green;
`;

const CommentBtn = styled.div`
  width: 6vh;
  background: purple;
`;

const CommentsList = styled.ul`
  margin: 10px 0;
  list-style: none;
`;

const Comment = styled.li`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #aaa;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CommenterBox = styled.div`
  display: flex;
  justify-content: start;
  height: 3vh;
  align-items: center;
`;

const CommenterPic = styled.div`
  height: 3vh;
  width: 3vh;
  background: blue;
`;

const CommenterName = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

const CommentContent = styled.div`
  p {
    font-size: 15px;
  }
`;

const CommentInputBox = styled.div`
  padding: 20px 10px;
`;

const CommentInput = styled.textarea`
  display: block;
  border: 1px solid black;
  padding: 5px;
  resize: none;
  width: 100%;
  margin: 10px auto;
  &:focus {
    outline: none;
  }
`;

const BlogSampleData = {
  blogs: 1,
  writer: "박홍진",
  time: "2023-01-10 12:12",
  title: "올해 강의 새로나왔는데 같이 들을 분 계신가요?",
  content: `제곧내입니다.
  어쩌구 저쩌구해서 어쩌구 저쩌구 본문 내용을 채우고 있습니다.
  어쩌구 저쩌구해서 어쩌구 저쩌구 본문 내용을 채우고 있습니다.`,
  nRead: 82,
  likes: 80,
  comment: 3,
  comments: [
    {
      commenter: "김민석",
      commentcontent: "안사요 안사~",
    },
    {
      commenter: "김은경",
      commentcontent: "저 들을까요",
    },
    {
      commenter: "박홍진",
      commentcontent: "ㅋ",
    },
  ],
};

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

function Blog() {
  return (
    <Container>
      <Header />
      <MainContents>
        <BlogInfo>
          <ProfilePic></ProfilePic>
          <InfoBox>
            <Writer>{BlogSampleData.writer}</Writer>
            <Details>{BlogSampleData.time}</Details>
          </InfoBox>
        </BlogInfo>
        <Title>{BlogSampleData.title}</Title>
        <Content>
          <p>{BlogSampleData.content}</p>
        </Content>
        <ContentInfo>조회수: {BlogSampleData.nRead}</ContentInfo>
        <ContentButtons>
          <LikeBtn></LikeBtn>
          <CommentBtn></CommentBtn>
        </ContentButtons>
      </MainContents>
      <CommentsList>
        {BlogSampleData.comments.map((comment) => (
          <Comment>
            <CommenterBox>
              <CommenterPic />
              <CommenterName>{comment.commenter}</CommenterName>
            </CommenterBox>
            <CommentContent>
              <p>{comment.commentcontent}</p>
            </CommentContent>
          </Comment>
        ))}
      </CommentsList>
      <CommentInputBox>
        <CommentInput placeholder="댓글을 입력해주세요."></CommentInput>
      </CommentInputBox>
    </Container>
  );
}

export default Blog;
