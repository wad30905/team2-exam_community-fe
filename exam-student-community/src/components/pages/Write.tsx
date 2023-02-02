import { useState, useEffect } from "react";
import TopBar from "../molecules/TopBar";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  ErrorMessage,
  WriteForm,
  WriteSelectorContainer,
  WriteSubmitContainer,
} from "../molecules/atoms/styled";
import { getBoards, writePost } from "../../api";
import { authCheck } from "../../api";
import {
  WriteSelector,
  TitleInput,
  ContentInput,
  Submit,
} from "../molecules/atoms/styled";
import { PostsList, PostsObject } from "../molecules/atoms/sampleData";
import { loginState, user } from "../../store/atoms";
import Loading from "../molecules/Loading";
interface IWriteForm {
  BoardId: string;
  PostTitle: string;
  PostContent: string;
}

interface IWriteState {
  state: { id: number };
}
function Write() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userName, setUserName] = useRecoilState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [writeState, setWriteState] = useState<{ id: number }>();
  const { state } = useLocation() as IWriteState;
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUserName(authName);
      setIsLoading(false);

      if (authStatus) {
        setWriteState(state);
        console.log("!!");
      } else {
        alert("로그인하셔야 글쓰기를 할 수 있습니다.");
        navigate("/login");
      }
    };

    checkUserAuth();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm<IWriteForm>();
  function onSubmit(data: IWriteForm) {
    const write = async () => {
      await writePost(userName, data.BoardId, data.PostTitle, data.PostContent);
    }
    write();
    navigate(`/posts/${data.BoardId}`);
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <TopBar
        id={writeState?.id}
        mainService={"자유게시판"}
        needWrite={false}
        needSearch={false}
      />
      <WriteForm onSubmit={handleSubmit(onSubmit)}>
        <WriteSelectorContainer>
          <WriteSelector {...register("BoardId")}>
            {Object.values(PostsObject).map((Posts, index) => (
              <option value={index+1}>{Posts}</option>
            ))}
          </WriteSelector>
        </WriteSelectorContainer>
        <TitleInput
          placeholder="제목"
          {...register("PostTitle", { required: "제목을 입력하세요" })}
        />
        {errors ? (
          <ErrorMessage>{errors?.PostTitle?.message}</ErrorMessage>
        ) : null}
        <ContentInput
          placeholder="내용을 입력하세요."
          {...register("PostContent", { required: "내용을 입력하세요" })}
        />
        {errors ? (
          <ErrorMessage>{errors?.PostContent?.message}</ErrorMessage>
        ) : null}
        <WriteSubmitContainer>
          <Submit>작성 완료</Submit>
        </WriteSubmitContainer>
      </WriteForm>
    </>
  );
}

export default Write;
