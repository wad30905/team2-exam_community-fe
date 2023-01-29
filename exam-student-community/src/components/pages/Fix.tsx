import { useState, useEffect } from "react";
import TopBar from "../molecules/TopBar";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  ErrorMessage,
  WriteSelectorContainer,
  WriteSubmitContainer,
} from "../molecules/atoms/styled";
import { fixPost, getBoards, writePost } from "../../api";
import { authCheck } from "../../api";
import {
  WriteForm,
  WriteSelector,
  TitleInput,
  ContentInput,
  Submit,
} from "../molecules/atoms/styled";
import { PostsList } from "../molecules/atoms/sampleData";
import { loginState, user } from "../../store/atoms";
import Loading from "../molecules/Loading";
import { IPostData } from "./Post";
interface IWriteForm {
  BoardId: string;
  PostTitle: string;
  PostContent: string;
}

interface IWriteState {
  state: { data: IPostData[] };
}
function Fix() {
  // const [isLoggedIn, setIsLoggedIn] = useRecoilValue(loginState);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useRecoilState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [writeState, setWriteState] = useState<{ id: number }>();
  const {
    state: { data },
  } = useLocation();
  //id를 따로 빼지 않고 setWriteState(state.data.post_detail.id 하면 오류나서 이렇게 함)
  const id = data.post_detail.id;

  const navigate = useNavigate();
  // 밑에 박홍진 테스트용 보세요.
  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUserName(authName);
      setIsLoading(false);
      if (authStatus) {
        setWriteState(id);
        console.log("!!");
      } else {
        alert("로그인하셔야 글쓰기를 할 수 있습니다.");
        navigate("/");
      }
    };
    checkUserAuth();
  }, []);
  // 박홍진 테스트용
  // useEffect(() => {
  //   console.log("Im in");
  //   setWriteState({id})
  //   setIsLoading(false);
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IWriteForm>({
    defaultValues: {
      BoardId: data.post_detail.num,
      PostTitle: data.post_detail.title,
      PostContent: data.post_detail.content,
    },
  });
  function onSubmit(data: IWriteForm) {
    //hideuser false 로 해놓았는데 이 옵션 추가 해야 함.
    fixPost(id, data.PostTitle, data.PostContent, false);
    navigate(`/posts/${data.BoardId}`);
  }
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <TopBar
        id={writeState?.id}
        mainService={`${data.post_detail.num}번 게시판`}
        needWrite={false}
        needSearch={false}
      />
      <WriteForm onSubmit={handleSubmit(onSubmit)}>
        <WriteSelectorContainer>
          <WriteSelector {...register("BoardId")} disabled={true}>
            {PostsList.map((Posts) => (
              <option>{Posts}</option>
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
          <Submit>수정 완료</Submit>
        </WriteSubmitContainer>
      </WriteForm>
    </>
  );
}

export default Fix;
