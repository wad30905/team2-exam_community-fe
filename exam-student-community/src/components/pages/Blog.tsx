import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Blogs from "./Blogs";
import TopBar from "../molecules/TopBar";
import Dropdown from "../molecules/Dropdown";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import BlogMainContents from "../molecules/BlogMainContents";
import Comments from "../molecules/atoms/Comments";
import { BlogMain } from "../molecules/atoms/styled";
import { MdStayCurrentLandscape } from "react-icons/md";
function Blog() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  return (
    <>
      <TopBar mainService={"자유게시판"} needWrite={false} needSearch={false}/>
      <BlogMain>
        <BlogMainContents/>
        <Comments />
      </BlogMain>
    </>
  );
}

export default Blog;
