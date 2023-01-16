import { useState, useEffect } from "react";
import TopBar from "../molecules/TopBar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

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
import { user } from "../../store/atoms";
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
  const {userName} = useRecoilValue(user);

  function onSubmit(data: IWriteForm) {
    writeBlog(userName, data.BlogTitle, data.BoardId, data.BlogContent);
    navigate("/blogs");
  }
  return (
    <>
      <TopBar
        mainService={"자유게시판"}
        needWrite={false}
        needSearch={false}
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
