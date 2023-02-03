import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import axios from "axios";
import { SERVER_URL } from "../../api";
import { BoardName } from "../molecules/atoms/styled";

export interface IPostsState {
  state: {
    boardId: number;
    boardName: string;
  } | null;
}

function Posts() {
  const { state } = useLocation() as IPostsState;
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState();

  useEffect(() => {
    if (state === null) {
      navigate("/");
      console.log("navigate");
    }
    const url = `${SERVER_URL}/blogs/${state?.boardId}`;
    axios({ method: "get", url, data: state?.boardId }).then((response) =>
      setPostsData(response.data[0])
    );
    console.log("state?.boardId :", state?.boardId);
    console.log("state?.boardName :", state?.boardName);
  }, []);

  return (
    <>
      <TopBar
        needWrite={true}
        needSearch={true}
      />
      <BoardName>{state?.boardName}</BoardName>
      <PostsList
        id={state?.boardId}
        name={state?.boardName}
        postsData={postsData}
      />
    </>
  );
}
export default Posts;
