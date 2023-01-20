import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import axios from "axios";
import { SERVER_URL } from "../../api";

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
  }, []);

  return (
    <>
      <TopBar
        id={state?.boardId}
        mainService={state ? state.boardName : "게시판타고들어와라 ^^"}
        needWrite={true}
        needSearch={true}
      />

      <PostsList
        id={state?.boardId}
        name={state?.boardName}
        postsData={postsData}
      />
    </>
  );
}
export default Posts;
