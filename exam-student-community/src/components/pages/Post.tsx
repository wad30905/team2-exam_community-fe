import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
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
import { samplePost } from "../molecules/atoms/sampleData";
import SearchBar from "../molecules/SearchBar";

interface IForm {
  comment: string;
}

export interface IPostData {
  post_detail: IPost;
  post_comments: IComment[];
  // comments 가 안오는거같은데 확인 필요.
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

function Post() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useRecoilState(user);
  const { register, handleSubmit, reset } = useForm<IForm>();
  const [postData, setPostData] = useState<IPostData | null>();
  const { state } = useLocation() as IPostState;
  console.log("state :", state);
  const postId = state?.postId;
  const boardName = state?.boardName;
  const navigate = useNavigate();

  function onSubmit(data: IForm) {
    reset();

    writeComment(data.comment, `${postData?.post_detail.id}`);
    window.location.reload();
  }

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
      }
    };

    // 실제 api로
    if (state === null) {
      navigate("/");
      console.log("navigate");
    } else {
      checkUserAuth();
      paintPost();
    }
    console.log("postData :", postData);
  }, []);

  return true ? (
    <>
      <TopBar
        id={postId}
        mainService={boardName}
        needWrite={false}
        needSearch={false}
      />
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
    </>
  ) : (
    <Loading />
  );
}

export default Post;
