import { Post, PostTitle, PostInfo, PostsContainer } from "./atoms/styled";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { SERVER_URL } from "../../api";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
export interface IPost {
  c_date: string;
  click_num: number;
  comment_num: number;
  content: string;
  d_date: null;
  id: number;
  like: number;
  m_date: string;
  num: number;
  title: string;
  user_name: string;
}

interface IPostsListProp {
  id?: number;
  postsName?: String;
}

function PostsList({id} : IPostsListProp, {postsName} : IPostsListProp) {
  const postsId = id;
  const [postsData, setPostsData] = useState<IPost[] | null>();

  useEffect(() => {
    const url = `${SERVER_URL}/posts/${postsId}`;
    axios({ method: "get", url, data: { postsId } }).then((response) =>
      setPostsData(response.data[0])
    );
  }, []);
  if (postsData) {
    return (
      <PostsContainer>
        {postsData.map((post: IPost, index: number) => (
          <Post key={index}>
            <Link to={`./${post.id}`} state={{ postId: post.id, postsName}}>
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
