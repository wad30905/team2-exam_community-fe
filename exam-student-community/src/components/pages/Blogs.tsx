import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Write from "./Write";
import { sampleBlogs } from "../molecules/atoms/sampleData";

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

const WriteBtn = styled.a``;

const LogOutBtn = styled.a`
  margin-left: 10px;
`;

const SearchBar = styled.div`
  display: flex;
  background: ${(props) => props.theme.accentColor};
  height: 10vh;
  justify-content: center;
  padding-top: 10px;
`;

const SearBox = styled.input`
  border: none;
  border-radius: 5px;
  width: 95%;
  height: 40px;
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
        <WriteBtn>
          <Link
            to={"/write"}
            state={{ userId: "userId", time: "2023-01-13", blogs: "1" }}
          >
            글쓰기
          </Link>
        </WriteBtn>
        <LogOutBtn>
          <Link to={"/"}>로그아웃</Link>
        </LogOutBtn>
      </LogoBar>
      <SearchBar>
        <SearBox placeholder="게시판을 입력하시오" />
      </SearchBar>
    </div>
  );
}

const BlogsList = styled.ul``;

const Blog = styled.li`
  a {
    background-color: white;
    color: black;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-around;
    padding: 5px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const BlogTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
`;
const BlogInfo = styled.span`
  font-size: 10px;
  font-weight: lighter;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

function Blogs() {
  return (
    <Container>
      <Header />
      <BlogsList>
        {sampleBlogs.map((blog) => (
          <Blog key={blog.id}>
            <Link to={`./${blog.id}`}>
              <BlogTitle>{blog.name}</BlogTitle>
              <BlogInfo>{blog.info}</BlogInfo>
            </Link>
          </Blog>
        ))}
      </BlogsList>
    </Container>
  );
}
export default Blogs;
