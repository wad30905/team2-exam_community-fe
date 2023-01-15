import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { sampleBlogs } from "../molecules/atoms/sampleData";
import Dropdown from "../molecules/Dropdown";
import TopBar from "../molecules/TopBar";
import BlogsList from "../molecules/BlogsList";
import SearchBar from "../molecules/SearchBar";
import { authCheck } from "../../api";
import Loading from "../molecules/Loading";

interface BlogsState {
  state: {
    blogsId: number;
    blogsName: String;
  };
}
function Blogs() {
  const { state } = useLocation() as BlogsState;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUsername] = useState("야매");

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["userName"];
      setIsLoggedIn(authStatus);
      setUsername(authName);
      setIsLoading(false);
    };
    checkUserAuth();
  }, []);
  return (
    <>
      <TopBar
        mainService={state.blogsName}
        needWrite={isLoggedIn ? true : false}
        needSearch={true}
        userName={userName}
      />
      <BlogsList />
    </>
  );
}
export default Blogs;
