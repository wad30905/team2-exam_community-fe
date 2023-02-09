import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import axios from "axios";
import { getPosts, SERVER_URL } from "../../api";
import {
  BoardName,
  BoardOption,
  BoardOptions,
  Wrapper,
} from "../molecules/atoms/styled";
import { BoardsObject } from "../molecules/atoms/sampleData";
import Loading from "../molecules/Loading";

function Posts() {
  const [postsData, setPostsData] = useState();
  const [boardIdState, setBoardIdState] = useState(2);
  const [boardNameState, setBoardNameState] = useState("정보게시판");
  const [changeBoardLoading, setChangeBoardLoading] = useState(false);

  useEffect(() => {
    // const url = `${SERVER_URL}/blogs/${boardIdState}`;
    // axios({ method: "get", url, data: boardIdState }).then((response) =>
    //   setPostsData(response.data[0])
    // );
    setChangeBoardLoading(true);
    const paintPosts = async () => {
      const response = await getPosts(boardIdState);
      setPostsData(response[0]);
      setChangeBoardLoading(false);
    };
    paintPosts();
    console.log("boardId : ", boardIdState);
    console.log("boardName : ", boardNameState);
  }, [boardIdState]);

  return (
    <Wrapper>
      <TopBar needWrite={true} needSearch={true} />
      <BoardOptions>
        {Object.keys(BoardsObject).map((key, index) => (
          <BoardOption
            key={key}
            onClick={() => {
              setBoardIdState(parseInt(key));
              setBoardNameState(BoardsObject[key]);
            }}
          >
            {BoardsObject[key]}
          </BoardOption>
        ))}
      </BoardOptions>
      <BoardName>{boardNameState}</BoardName>
      {changeBoardLoading ? (
        <Loading />
      ) : (
        <PostsList
          id={boardIdState}
          name={boardNameState}
          postsData={postsData}
        />
      )}
    </Wrapper>
  );
}
export default Posts;
