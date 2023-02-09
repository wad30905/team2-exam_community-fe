import { Post, PostTitle, PostInfo, PostsContainer } from "./atoms/styled";
import { Link } from "react-router-dom";
import { timeCalculator } from "../../api";
import Loading from "./Loading";
import { IPost } from "../pages/Post";

interface IPostsListProp {
  id?: number;
  name?: string;
  postsData?: IPost[] | undefined;
}

function PostsList({ id, name, postsData }: IPostsListProp) {
  if (postsData) {
    return (
      <PostsContainer>
        {postsData.map((post: any, index: number) => (
          <Post key={index}>
            <Link
              to={`/posts/${post.id}`}
              state={{ postId: post.id, boardName: name }}
            >
              {post.title.length <= 23 ? (
                <PostTitle>{post.title}</PostTitle>
              ) : (
                <PostTitle>{post.title.slice(0, 23) + "..."}</PostTitle>
              )}

              <PostInfo>
                <span>조회수{post.click_num}</span>
                <span>댓글수{post.comment_num}</span>
                <span>좋아요{post.like}</span>
                <span>{timeCalculator(post.c_date)}</span>
              </PostInfo>
            </Link>
          </Post>
        ))}
      </PostsContainer>
    );
  }
  return <Loading />;
}

export default PostsList;
