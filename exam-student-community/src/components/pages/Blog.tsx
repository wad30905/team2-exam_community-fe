import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Blogs from "./Blogs";
import TopBar from "../molecules/TopBar";
import Dropdown from "../molecules/Dropdown";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { authCheck } from "../../api";
import { BlogSampleData } from "../molecules/atoms/sampleData";
import {
  BlogInfo,
  ProfilePic,
  InfoBox,
  Writer,
  Details,
  MainContents,
  Title,
  Content,
  ContentButtons,
  ContentInfo,
  LikeBtn,
  CommentBtn,
  CommentsList,
  Comment,
  CommenterBox,
  CommenterPic,
  CommenterName,
  CommentContent,
  CommentInput,
  CommentForm,
  CommentButton,
} from "../molecules/atoms/styled";
import { useForm } from "react-hook-form";
import { IconSend } from "../molecules/atoms/icons";

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

interface IComment {
  commenter: string;
  commentcontent: string;
}

function Blog() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  const { register, handleSubmit, reset } = useForm<IForm>();
  const [blogData, setBlogData] = useState<IBlogData>();
  const [commentData, setCommentData] = useState<IComment[]>();

  function onSubmit(data: IForm) {
    console.log("--------------");
    console.log("submit !!");
    console.log("useState 샘플데이터: ", commentData);
    console.log("작성자명 : ", username);
    console.log("댓글내용 : ", data.comment);
    console.log("--------------");
    console.log("commentData :", commentData);
    console.log("--------------");

    setCommentData((prevComments: any) => {
      return [
        ...prevComments,
        { commenter: username, commentcontent: data.comment },
      ];
    });
    // setBlogData 대신 axios.post (해서 blogData 보내야함.)
    // 보낸후에 다시 받아오는 코드는 useEffect에 넣을지, 여기에 넣을지.

    reset();
  }

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUsername(authName);
      setIsLoading(false);
    };
    checkUserAuth();
    setBlogData(BlogSampleData);
    setCommentData(BlogSampleData.comments);
  }, []);

  return (
    <>
      <TopBar toggle={toggle} mainService={"자유게시판"} needWrite={false} />
      {isOpen && <Dropdown username={username} isLoggedIn={isLoggedIn} />}
      <MainContents>
        <BlogInfo>
          <ProfilePic></ProfilePic>
          <InfoBox>
            <Writer>{BlogSampleData.writer}</Writer>
            <Details>{BlogSampleData.time}</Details>
          </InfoBox>
        </BlogInfo>
        <Title>{BlogSampleData.title}</Title>
        <Content>
          <p>{BlogSampleData.content}</p>
        </Content>
        <ContentInfo>조회수: {BlogSampleData.nRead}</ContentInfo>
        <ContentButtons>
          <LikeBtn></LikeBtn>
          <CommentBtn></CommentBtn>
        </ContentButtons>
      </MainContents>
      <CommentsList>
        {commentData?.map((comment) => (
          <Comment>
            <CommenterBox>
              <CommenterPic />
              <CommenterName>{comment.commenter}</CommenterName>
            </CommenterBox>
            <CommentContent>
              <p>{comment.commentcontent}</p>
            </CommentContent>
          </Comment>
        ))}
      </CommentsList>

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
    </>
  );
}

export default Blog;
