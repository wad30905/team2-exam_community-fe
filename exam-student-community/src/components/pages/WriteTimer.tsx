import { useState, useEffect, useRef } from "react";
import TopBar from "../molecules/TopBar";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Select from "react-select";
import {
  ErrorMessage,
  WriteForm,
  WriteSelectorContainer,
  WriteSubmitContainer,
} from "../molecules/atoms/styled";
import { writePost, authCheck } from "../../api";
import {
  WriteSelector,
  TitleInput,
  ContentInput,
  Submit,
} from "../molecules/atoms/styled";
import { PostsList, BoardsObject } from "../molecules/atoms/sampleData";
import { loginState, user } from "../../store/atoms";
import Loading from "../molecules/Loading";

interface IWriteForm {
  PostTitle: string;
  PostContent: string;
}

interface ILinkState {
  state: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

function WriteTimer() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userName, setUserName] = useRecoilState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [writeState, setWriteState] = useState<{ id: number }>();
  const { state } = useLocation() as ILinkState;
  const boardId = "5";
  const options = { value: "5", label: "공부시간 인증" };
  const navigate = useNavigate();

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  //resize
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log("vh :", vh);
  });

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUserName(authName);
      setIsLoading(false);
    };
    console.log("Link state :", state);

    checkUserAuth();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<IWriteForm>();

  function onSubmit(data: IWriteForm) {
    if (boardId === undefined) {
      alert("게시판을 선택해주세요");
      return false;
    }
    const write = async () => {
      await writePost(userName, boardId, data.PostTitle, data.PostContent);
    };
    write();
    navigate(`/posts`);
  }

  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      color: state.isSelected ? "white" : "#5928E5",
      backgroundColor: state.isSelected ? "#5928E5" : "white",
    }),

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "white",
      padding: "10px",
      border: "1px solid #eee",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#111" }),
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <TopBar needWrite={false} needSearch={false} />
      <WriteForm
        onSubmit={handleSubmit(onSubmit)}
        height={`calc(100vh - ${window.innerHeight - window.outerHeight}px)`}
      >
        <Select
          value={options}
          placeholder={"게시판을 선택하십시오."}
          styles={customStyles}
        />
        <TitleInput
          defaultValue={`${userName} ${state.hours}시간 ${state.minutes}분 인증`}
          placeholder="제목"
          {...register("PostTitle", {
            required: "제목을 입력하세요",
            maxLength: {
              value: 22000,
              message: "글자수가 너무 많습니다.",
            },
          })}
        />
        {errors ? (
          <ErrorMessage>{errors?.PostTitle?.message}</ErrorMessage>
        ) : null}
        <ContentInput
          defaultValue={`총 공부시간 : ${state.hours}시간 ${state.minutes}분 ${state.seconds}초
          한마디 입력하세요.
          `}
          placeholder="내용을 입력하세요."
          {...register("PostContent", {
            required: "내용을 입력하세요",
            maxLength: {
              value: 22000,
              message: "글자수가 너무 많습니다.",
            },
          })}
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

export default WriteTimer;
