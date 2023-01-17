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
import PostsList from "../molecules/PostsList";

interface IPostsState {
  state: {
    postsId: number;
    postsName: string;
  } | null;
}
function Posts() {
  const { state } = useLocation() as IPostsState;
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
      <TopBar id={state?.postsId}
        mainService={state ? state.postsName : "게시판타고들어와라 ^^"}
        needWrite={true}
        needSearch={true}
      />
      <PostsList id={state?.postsId} postsName={state?.postsName}/>
    </>
  );
}
export default Posts;
