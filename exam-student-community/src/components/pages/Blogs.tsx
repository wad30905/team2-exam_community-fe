import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Write from "./Write";
import { sampleBlogs } from "../molecules/atoms/sampleData";
import Dropdown from "../molecules/Dropdown";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import TopBar from "../molecules/TopBar";
import BlogsList from "../molecules/BlogsList";
import SearchBar from "../molecules/SearchBar";

interface BlogsState {
  state: {
    blogsId: number;
    blogsName: String;
  }
}
function Blogs() {
  const {state} = useLocation() as BlogsState;
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  return (
    <>
      <TopBar mainService={state.blogsName} needWrite={isLoggedIn ? true : false} needSearch={true}/>
      <BlogsList/>
    </>
  );
}
export default Blogs;