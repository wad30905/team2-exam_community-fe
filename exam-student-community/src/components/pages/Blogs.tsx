import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import TopBar from "../molecules/TopBar";
import BlogsList from "../molecules/BlogsList";

interface BlogsState {
  state: {
    blogsId: number;
    blogsName: String;
  } | null;
}
function Blogs() {
  const { state } = useLocation() as BlogsState;
  const navigate = useNavigate();

  console.log(state);

  useEffect(() => {
    if (state === null) {
      navigate("/");
      console.log("navigate");
    }
  }, []);

  return (
    <>
      <TopBar
        mainService={state ? state.blogsName : "게시판타고들어와라 ^^"}
        needWrite={true}
        needSearch={true}
      />
      <BlogsList id={state?.blogsId} />
    </>
  );
}
export default Blogs;
