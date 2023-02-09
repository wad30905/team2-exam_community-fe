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

function Posts() {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState();
  const [boardIdState, setBoardIdState] = useState(2);
  const [boardNameState, setBoardNameState] = useState("정보게시판");

  useEffect(() => {
    // const url = `${SERVER_URL}/blogs/${boardIdState}`;
    // axios({ method: "get", url, data: boardIdState }).then((response) =>
    //   setPostsData(response.data[0])
    // );
    const paintPosts = async () => {
      const response = await getPosts(boardIdState);
      setPostsData(response[0]);
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
        {/* <BoardOption
          onClick={() => {
            setBoardIdState(1);
            setBoardNameState("자유게시판");
          }}
        >
          욥션1
        </BoardOption>
        <BoardOption
          onClick={() => {
            setBoardIdState(2);
            setBoardNameState("정보게시판");
          }}
        >
          욥션2
        </BoardOption>
        <BoardOption
          onClick={() => {
            setBoardIdState(3);
            setBoardNameState("LEET게시판");
          }}
        >
          욥션3
        </BoardOption>
        <BoardOption
          onClick={() => {
            setBoardIdState(4);
            setBoardNameState("CPA게시판");
          }}
        >
          욥션4
        </BoardOption> */}
      </BoardOptions>
      <BoardName>{boardNameState}</BoardName>
      <PostsList
        id={boardIdState}
        name={boardNameState}
        postsData={postsData}
      />
    </Wrapper>
  );
}
export default Posts;
