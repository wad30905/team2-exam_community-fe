import { useState, useEffect } from "react";
import TopBar from "../molecules/TopBar";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Select from "react-select";

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
import { PostsList, BoardsObject } from "../molecules/atoms/sampleData";
import { loginState, user } from "../../store/atoms";
import Loading from "../molecules/Loading";
import { IPostData } from "./Post";
interface IWriteForm {
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
  const boardId0 = data.post_detail.num;
  console.log("data", data);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["username"];
      setIsLoggedIn(authStatus);
      setUserName(authName);
      setIsLoading(false);
      setBoardId(boardId0);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IWriteForm>({
    defaultValues: {
      PostTitle: data.post_detail.title,
      PostContent: data.post_detail.content,
    },
  });

  //selector
<<<<<<< HEAD
  let options = Object.keys(PostsObject).map((item, index) => {
    return { value: item, label: PostsObject[item] };
=======
  let options = Object.keys(BoardsObject).map((item, index) => {
    return { value: item, label: BoardsObject[item] };
>>>>>>> develop
  });
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

  const [boardId, setBoardId] = useState<any>();
  const onSelect = (e: any) => {
    setBoardId(e.value);
  };

  function onSubmit(data: IWriteForm) {
    //hideuser false 로 해놓았는데 이 옵션 추가 해야 함.
    fixPost(id, data.PostTitle, data.PostContent, false);
    alert("수정을 완료했습니다.");
    //  navigate(`/posts/${data.BoardId}`);
    navigate(-1);
  }
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
          defaultValue={options[Number(boardId) - 1]}
          options={options}
          onChange={onSelect}
          placeholder={"게시판을 선택하십시오."}
          styles={customStyles}
          isDisabled={true}
        />
        <TitleInput
          placeholder="제목"
          {...register("PostTitle", {
            required: "제목을 입력하세요",
            maxLength: {
              value: 500,
              message: "글자수가 너무 많습니다.",
            },
          })}
        />
        {errors ? (
          <ErrorMessage>{errors?.PostTitle?.message}</ErrorMessage>
        ) : null}
        <ContentInput
          placeholder="내용을 입력하세요."
          {...register("PostContent", {
            required: "내용을 입력하세요",
            maxLength: {
              value: 500,
              message: "글자수가 너무 많습니다.",
            },
          })}
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
