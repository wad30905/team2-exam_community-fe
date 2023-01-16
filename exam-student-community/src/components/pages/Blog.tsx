import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { authCheck, fetchBlog, writeComment } from "../../api";
import { BlogSampleData } from "../molecules/atoms/sampleData";
import { useForm } from "react-hook-form";
import { IconSend } from "../molecules/atoms/icons";
import BlogMainContents from "../molecules/BlogMainContents";
import Comments from "../molecules/atoms/Comments";
import { BlogMain } from "../molecules/atoms/styled";

import {
  CommentForm,
  CommentInput,
  CommentButton,
} from "../molecules/atoms/styled";
interface IForm {
  comment: string;
}

interface IBlogData {
  blogs: number;
  writer: string;
  time: string;
  title: string;
  content: string;
  nRead: number;
  likes: number;
  comment: number;
  comments: { commenter: string; commentcontent: string }[];
}

export interface IComment {
  commenter: string;
  commentcontent: string;
}

interface Params {
  postId: Readonly<string>;
}

function Blog() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  const { register, handleSubmit, reset } = useForm<IForm>();
  const [blogData, setBlogData] = useState<IBlogData>();
  const [commentData, setCommentData] = useState<IComment[]>();
  const { postId } = useParams() as unknown as Params;
  const { state } = useLocation();

  function onSubmit(data: IForm) {
    reset();
    console.log("--------------");
    console.log("submit !!");
    console.log("useState 샘플데이터: ", commentData);
    console.log("작성자명 : ", userName);
    console.log("댓글내용 : ", data.comment);
    console.log("--------------");
    console.log("commentData :", commentData);
    console.log("--------------");

    // sampleData로
    setCommentData((prevComments: any) => {
      return [
        ...prevComments,
        { commenter: userName, commentcontent: data.comment },
      ];
    });

    // 실제 api 동작
    // writeComment({ commenter: userName, commentcontent: data.comment });
  }
  console.log("state : ", state);
  console.log("state.postId : ", state.postId);
  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUserName(authName);
      setIsLoading(false);
    };
    const paintBlog = async () => {
      const BlogData = await fetchBlog(postId);
      setBlogData(BlogData as any);
      // setCommentData(BlogData.comments as any);
    };

    // 실제 api로
    checkUserAuth();
    paintBlog();

    // sample 데이터로 확인
    // checkUserAuth();
    // setBlogData(BlogSampleData);
    // setCommentData(BlogSampleData.comments);
  }, []);
  return (
    <>
      <TopBar mainService={"자유게시판"} needWrite={false} needSearch={false} />
      <BlogMain>
        <BlogMainContents />
        <Comments comments={commentData} />
        <CommentForm onSubmit={handleSubmit(onSubmit)}>
          <CommentInput
            {...register("comment", {
              required: "댓글을 입력해주세요",
            })}
            type="comment"
            name="comment"
          />
          <CommentButton type="submit">
            <IconSend />
          </CommentButton>
        </CommentForm>
      </BlogMain>
    </>
  );
}

export default Blog;
