import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState, user } from "../../store/atoms";
import { authCheck, writeComment, getPost } from "../../api";
import { useForm } from "react-hook-form";
import { IconSend } from "../molecules/atoms/icons";
import PostMainContents from "../molecules/PostMainContents";
import Comments from "../molecules/Comments";
import { PostMain } from "../molecules/atoms/styled";
import {
  CommentForm,
  CommentInput,
  CommentButton,
} from "../molecules/atoms/styled";
import Loading from "../molecules/Loading";
import SearchBar from "../molecules/SearchBar";
import {
  TopBarContainer,
  TopContainer,
  TopBarMenu,
  TopBarMain,
  TopBarBtns,
  PostMenuBar,
  PostMenuBtn,
} from "../molecules/atoms/styled";
import { IconBackBtn, IconMoreBtn } from "../molecules/atoms/icons";
import TopBarBack from "../molecules/TopBarBack";

interface IForm {
  comment: string;
}

export interface IPost {
  c_date: string | null;
  d_date: string | null;
  m_date: string | null;
  click_num: number;
  comment_num: number;
  content: string;
  hide_user: boolean;
  id: number;
  like: number;
  num: number;
  title: string;
  user_id: string;
}

export interface IComment {
  user_id: string;
  content: string;
  c_date: string;
}
interface IPostState {
  state: {
    postId: number;
    boardName: string;
  } | null;
}

export interface IPostData {
  post_detail: IPost;
  post_comments: IComment[];
}

function Post() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useRecoilState(user);
  const [isOptions, setIsOptions] = useState(false);
  const { register, handleSubmit, reset } = useForm<IForm>();
  const [postData, setPostData] = useState<IPostData | null>();
  const { state } = useLocation() as IPostState;
  const postId = state?.postId;
  const boardName = state?.boardName;
  const navigate = useNavigate();

  function onSubmit(data: IForm) {
    reset();

    writeComment(data.comment, `${postData?.post_detail.id}`);
    window.location.reload();
  }

  console.log("postData :", postData);

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUserName(authName);
      setIsLoading(false);
    };
    const paintPost = async () => {
      if (postId) {
        const post = await getPost(postId);
        setPostData(post as unknown as IPostData | null);
        console.log("post :", post);
      }
    };

    if (state === null) {
      navigate("/");
      console.log("navigate to mainpage (state===null)");
    } else {
      checkUserAuth();
      paintPost();
    }
    console.log("postData :", postData);
  }, []);

  const onBack = () => {
    navigate(-1);
  };
  const onOptions = () => {
    setIsOptions((current) => !current);
  };

  return postData ? (
    <>
      <TopBarContainer>
        <TopContainer>
          <TopBarMenu onClick={onBack}>
            <IconBackBtn className="backButton" />
          </TopBarMenu>
          <TopBarMain>
            <Link to="/">코코볼</Link>
          </TopBarMain>
          <TopBarBtns>
            <IconMoreBtn onClick={onOptions} />
          </TopBarBtns>
        </TopContainer>
        <SearchBar placeholder={"검색하시오."} />
      </TopBarContainer>
      {/* ----------Top Bar---------- */}
      <PostMain>
        <PostMainContents post={postData?.post_detail} />
        <Comments comments={postData?.post_comments} />
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
      </PostMain>
      {/* ----------Post Main---------- */}
      {isOptions ? (
        isLoggedIn ? (
          <PostMenuBar>
            <PostMenuBtn>
              <Link to={`/posts/${postId}/fix`} state={{ data: postData }}>
                수정
              </Link>
            </PostMenuBtn>
            <PostMenuBtn>삭제</PostMenuBtn>
            <PostMenuBtn>URL 복사</PostMenuBtn>
          </PostMenuBar>
        ) : (
          <PostMenuBar>
            <PostMenuBtn>신고</PostMenuBtn>
            <PostMenuBtn>URL 복사</PostMenuBtn>
          </PostMenuBar>
        )
      ) : null}
    </>
  ) : (
    <Loading />
  );
}

export default Post;
