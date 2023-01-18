import { IconUser } from "./atoms/icons";
import {
  Comment,
  CommenterBox,
  CommenterName,
  CommentContent,
  CommentsList,
} from "./atoms/styled";
import { IComment } from "../pages/Post";

interface ICommentsProp {
  comments: IComment[] | undefined;
}

function Comments({ comments }: ICommentsProp) {
  return (
    <CommentsList>
      {comments?.map((comment, index) => (
        <Comment key={index}>
          <CommenterBox>
            <IconUser style={{ width: "2vw", height: "3vh" }} />
            <CommenterName>{comment.user_id}</CommenterName>
          </CommenterBox>
          <CommentContent>
            <p>{comment.content}</p>
          </CommentContent>
        </Comment>
      ))}
    </CommentsList>
  );
}

export default Comments;
