import { IconUser } from "./icons";
import { BlogSampleData } from "./sampleData";
import {
  Comment,
  CommenterBox,
  CommenterName,
  CommentContent,
  CommentsList,
} from "./styled";
function Comments() {
  return (
    <CommentsList>
      {BlogSampleData.comments.map((comment, index) => (
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
