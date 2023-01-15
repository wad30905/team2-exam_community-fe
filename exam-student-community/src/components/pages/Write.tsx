import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  Search,
  WriteSelectorContainer,
  WriteSubmitContainer,
} from "../molecules/atoms/styled";
import { writeBlog } from "../../api";
import { authCheck } from "../../api";
import {
  WriteContents,
  WriteSelector,
  TitleInput,
  ContentInput,
  Submit,
} from "../molecules/atoms/styled";
import { BlogsList } from "../molecules/atoms/sampleData";
import { useQuery } from "react-query";
interface IWriteForm {
  BoardId: string;
  BlogTitle: string;
  BlogContent: string;
}

function Write() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IWriteForm>();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const checkUserAuth = async () => {
      const authData = await authCheck();
      const authStatus = authData["isAuthenticated"];
      const authName = authData["userName"];
      setIsLoggedIn(authStatus);
      setUsername(authName);
      setIsLoading(false);
    };
    checkUserAuth();
  }, []);

  function onSubmit(data: IWriteForm) {
    writeBlog("hongjin", data.BlogTitle, data.BoardId, data.BlogContent);
    navigate("/blogs");
  }
  return (
    <>
      <TopBar
        mainService={"자유게시판"}
        needWrite={false}
        needSearch={false}
        userName={userName}
      />
      <WriteContents onSubmit={handleSubmit(onSubmit)}>
        <WriteSelectorContainer>
          <WriteSelector {...register("BoardId")}>
            {BlogsList.map((Blogs) => (
              <option>{Blogs}</option>
            ))}
          </WriteSelector>
        </WriteSelectorContainer>
        <TitleInput
          placeholder="제목"
          {...register("BlogTitle", { required: "제목을 입력하세요" })}
        />
        <ContentInput
          placeholder="내용을 입력하세요."
          {...register("BlogContent", { required: "내용을 입력하세요" })}
        />
        <WriteSubmitContainer>
          <Submit>작성 완료</Submit>
        </WriteSubmitContainer>
      </WriteContents>
    </>
  );
}

export default Write;
