import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import BlogsList from "../molecules/BlogsList";


interface BlogsState {
  state: {
    blogsId: number;
    blogsName: String;
  };
}
function Blogs() {
  const { state } = useLocation() as BlogsState;
  const navigate = useNavigate();
  if (state === null) {
    navigate("/");
  }
  return (
    <>
      <TopBar
        mainService={"1"}
        needWrite={true}
        needSearch={true}
      />
      <BlogsList />
    </>
  );
}
export default Blogs;
