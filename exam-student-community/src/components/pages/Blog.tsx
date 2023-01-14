import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import Dropdown from "../molecules/Dropdown";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { authCheck } from "../../api";
import BlogMainContents from "../molecules/BlogMainContents";
import Comments from "../molecules/atoms/Comments";
import { BlogMain } from "../molecules/atoms/styled";
import { MdStayCurrentLandscape } from "react-icons/md";
function Blog() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUsername(authName);
      setIsLoading(false);
    };
    checkUserAuth();
  }, []);
  return (
    <>
      <TopBar mainService={"자유게시판"} needWrite={false} needSearch={false} userName={userName}/>
      <BlogMain>
        <BlogMainContents/>
        <Comments />
      </BlogMain>
    </>
  );
}

export default Blog;
