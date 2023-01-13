import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import Dropdown from "../molecules/Dropdown";
import { useRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../molecules/atoms/styled";
import { writeBlog } from "../../api";
import { authCheck } from "../../api";
const Container = styled.div`
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
  background: white;
`;

const Selector = styled.select`
  margin: 10px;
  display: block;
  height: 5vh;
  width: 40%;
  border-radius: 5px;
  border: 1px solid #aaa;
  margin-left: 5%;
`;

const WriteContents = styled.form``;

const TitleInput = styled.input`
  display: block;
  height: 10vh;
  width: 90%;
  margin: 20px auto;
  font-size: 25px;
  overflow: hidden;
  border: none;
  border-bottom: 1px solid #aaa;
  &:focus {
    outline: none;
  }
`;

const ContentInput = styled.textarea`
  display: block;
  height: 50vh;
  width: 90%;
  margin: 10px auto;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Submit = styled.button`
  background: ${(props) => props.theme.accentColor};
  color: white;
  height: 10vh;
  width: 70%;
  margin: 20px auto;
  display: block;
  border: none;
  font-size: 30px;
`;

const BlogsList = [
  "게시판1",
  "게시판2",
  "게시판3",
  "게시판4",
  "게시판5",
  "게시판6",
];

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
  const [username, setUsername] = useState("");

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
  }, []);

  function onSubmit(data: IWriteForm) {
    writeBlog("hongjin", data.BlogTitle, data.BoardId, data.BlogContent);
    navigate("/blogs");
  }
  return (
    <Container>
      <TopBar toggle={toggle} mainService={"자유게시판"} needWrite={false} />
      {isOpen && <Dropdown username={username} isLoggedIn={isLoggedIn} />}
      <WriteContents onSubmit={handleSubmit(onSubmit)}>
        <Selector {...register("BoardId")}>
          {BlogsList.map((Blogs) => (
            <option>{Blogs}</option>
          ))}
        </Selector>
        <TitleInput
          placeholder="제목"
          {...register("BlogTitle", { required: "제목을 입력하세요" })}
        />
        <ErrorMessage>{errors?.BlogTitle?.message}</ErrorMessage>
        <ContentInput
          placeholder="내용을 입력하세요."
          {...register("BlogContent", { required: "내용을 입력하세요" })}
        />
        <ErrorMessage>{errors?.BlogContent?.message}</ErrorMessage>
        <Submit>작성 완료</Submit>
      </WriteContents>
    </Container>
  );
}

export default Write;
