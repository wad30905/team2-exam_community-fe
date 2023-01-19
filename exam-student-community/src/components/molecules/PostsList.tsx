import { Post, PostTitle, PostInfo, PostsContainer } from "./atoms/styled";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { timeCalculator } from "../../api";
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

  console.log("PostsList");
  console.log("postsData:", postsData);

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
                <span>{timeCalculator(post.c_date)}</span>
                <span>조회수{post.click_num}</span>
                <span>좋아요{post.like}</span>
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
