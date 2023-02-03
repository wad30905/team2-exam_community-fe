import { useState } from "react";
import { IconLike, IconLiked, IconUser } from "./atoms/icons";
import {
  Comment,
  CommenterBox,
  CommenterName,
  CommentContent,
  CommentsList,
  CommentTime,
  CommentButtons,
} from "./atoms/styled";
import { IComment } from "../pages/Post";
import { timeCalculator } from "../../api";

interface ICommentsProp {
  comments: IComment[] | undefined;
}

function Comments({ comments }: ICommentsProp) {
  const [likeClicked, setLikeClicked] = useState([false]);
  const [likeNum, setLikeNum] = useState();

  const onLike = (index: number) => {
    console.log("likeClicked :", likeClicked);
    setLikeClicked((prevArray) => {
      const copyArray = [...prevArray];
      const isLiked = copyArray[index];
      copyArray[index] = !isLiked;
      return copyArray;
    });
  };

  return (
    <CommentsList>
      {comments?.map((comment, index) => (
        <Comment key={index}>
          <CommenterBox>
            <IconUser className="iconUser" />
            <CommenterName>{comment.user_name}</CommenterName>
            <CommentTime>{timeCalculator(comment.c_date)}</CommentTime>
          </CommenterBox>
          <CommentContent>
            <p>{comment.content}</p>
            <CommentButtons
              onClick={() => {
                onLike(index);
              }}
            >
              {likeClicked[index] ? <IconLiked style={{color: "red"}}/> : <IconLike />}
            </CommentButtons>
          </CommentContent>
        </Comment>
      ))}
    </CommentsList>
  );
}

export default Comments;
