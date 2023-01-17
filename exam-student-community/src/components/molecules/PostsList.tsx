import { Post, PostTitle, PostInfo, PostsContainer } from "./atoms/styled";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { SERVER_URL } from "../../api";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { samplePosts } from "./atoms/sampleData";

interface IPostsListProp {
  id?: number;
  name?: string;
}

function PostsList({id, name} : IPostsListProp) {
  const [postsData, setPostsData] = useState<any | null>();
  useEffect(() => {
    const url = `${SERVER_URL}/posts/${id}`;
    axios({ method: "get", url, data: { id } }).then((response) =>
      setPostsData(response.data[0])
    );
  }, []);
  if (samplePosts) {
    return (
      <PostsContainer>
        {samplePosts.map((post: any, index: number) => (
          <Post key={index}>
            <Link to={`./${post.id}`} state={{ postId: post.id, boardName: name}}>
              <PostTitle>{post.title}</PostTitle>
              <PostInfo>
                <span>{`1분전|`}</span>
                <span>{`조회100|`}</span>
                <span>{`좋아요100`}</span>
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
