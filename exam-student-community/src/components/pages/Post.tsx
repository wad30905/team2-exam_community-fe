import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import { useRecoilState } from "recoil";
import { loginState, user } from "../../store/atoms";
import { authCheck, writeComment, getPost } from "../../api";
import { useForm } from "react-hook-form";
import { IconSend } from "../molecules/atoms/icons";
import PostMainContents from "../molecules/PostMainContents";
import Comments from "../molecules/atoms/Comments";
import { PostMain } from "../molecules/atoms/styled";
import {
  CommentForm,
  CommentInput,
  CommentButton,
} from "../molecules/atoms/styled";
import Loading from "../molecules/Loading";

interface IForm {
  comment: string;
}

export interface IPostData {
  c_date: string | null;
  d_date: string | null;
  m_date: string | null;
  click_num: number;
  comment_num: number;
  content: string;
  id: number;
  like: number;
  num: number;
  title: string;
  user_name: string;
  comments: { commenter: string; commentcontent: string }[];
  // comments 가 안오는거같은데 확인 필요.
}

interface IPostState {
  state: {
    postId: number;
    postName: string;
  } | null;
}

function Post() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useRecoilState(user);
  const { register, handleSubmit, reset } = useForm<IForm>();
  const [postData, setPostData] = useState<IPostData | null>();
  const { state } = useLocation() as IPostState;
  const postId = state?.postId;
  const postName = state?.postName;
  const navigate = useNavigate();

  function onSubmit(data: IForm) {
    reset();
    writeComment({ commenter: userName, commentcontent: data.comment });
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
  }, []);

  return !isLoading ? (
    <>
      <TopBar id={postId} mainService={postName} needWrite={false} needSearch={false} />
      <PostMain>
        <PostMainContents post={postData} />
        <Comments comments={postData?.comments} />
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
