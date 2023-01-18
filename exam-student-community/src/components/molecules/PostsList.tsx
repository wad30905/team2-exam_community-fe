import { Post, PostTitle, PostInfo, PostsContainer } from "./atoms/styled";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { SERVER_URL } from "../../api";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { samplePosts } from "./atoms/sampleData";
import { IPostData } from "../pages/Post";

interface IPostsListProp {
  id?: number;
  name?: string;
  postsData?: IPostData[] | undefined;
}

function PostsList({ id, name, postsData }: IPostsListProp) {
  // 서버 연결됐을때는, samplePosts를 postsData로 수정
  if (postsData) {
    return (
      <PostsContainer>
        {postsData.map((post: any, index: number) => (
          <Post key={index}>
            <Link
              to={`/posts/${post.id}`}
              state={{ postId: post.id, boardName: name }}
            >
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
