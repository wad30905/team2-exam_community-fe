import { IconUser } from "./icons";
import {
  Comment,
  CommenterBox,
  CommenterName,
  CommentContent,
  CommentsList,
} from "./styled";

interface IComment {
  commenter: string;
  commentcontent: string;
}

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
            <CommenterName>{comment.commenter}</CommenterName>
          </CommenterBox>
          <CommentContent>
            <p>{comment.commentcontent}</p>
          </CommentContent>
        </Comment>
      ))}
    </CommentsList>
  );
}

export default Comments;
