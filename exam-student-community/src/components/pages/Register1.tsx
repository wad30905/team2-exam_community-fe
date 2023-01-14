import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IconBackBtn, IconMoreBtn } from "../molecules/atoms/icons";
import { useNavigate } from "react-router-dom";
import {
  Header,
  FormBox,
  RegisterButton,
  InputBox,
} from "../molecules/atoms/styled";

const Register = () => {
  const [username, setUsername] = useState<string>(""); // 유저 이름
  const [userId, setUserId] = useState<string>(""); // 아이디
  const [password, setPassword] = useState<string>(""); // 비번
  const [passwordConfirm, setPasswordConfirm] = useState<string>(""); // 비번 확인
  const [email, setEmail] = useState<string>(""); // 이메일
  const [phone, setPhone] = useState<string>(""); // 번호
  const [pdCheckText, setPdCheckText] = useState<string>("");
  const [pdText, setPdText] = useState<string>("");

  const navigate = useNavigate();

  const onClickNext = () => {
    if (
      username !== "" &&
      userId !== "" &&
      password !== "" &&
      passwordConfirm !== "" &&
      email !== "" &&
      phone !== ""
    ) {
      navigate("/register2");
    } else {
      alert("빈칸을 전부 입력해주세요.");
    }
  };

  const onClickPrev = () => {
    navigate("/login");
  };

  const onHandleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이름
    const name = e.target.value;
    setUsername(name);
  };

  const onHandleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 아이디
    const id = e.target.value;
    setUserId(id);
  };

  const onHandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 비밀번호
    const pd = e.target.value;
    setPassword(pd);
    if (pd.length < 8 || pd.length > 15) {
      setPdText("8~30 글자로 입력해주세요.");
    } else {
      setPdText("");
    }
  };
  const onHandlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 확인
    const pd = e.target.value;
    console.log(pd);
    setPasswordConfirm(pd);
    if (pd !== password) {
      setPdCheckText("동일한 비밀번호를 입력하세요");
    } else if (pd === password) {
      setPdCheckText("");
    }
  };

  const onHandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이메일
    const email = e.target.value;
    setEmail(email);
  };

  const onHandlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 번호
    const number = e.target.value;
    setPhone(number);
  };
  return (
    <>
      <Header>
        <button onClick={onClickPrev}>
          <IconBackBtn />
        </button>
        <h1>회원가입(1/2)</h1>
        <button>
          <IconMoreBtn />
        </button>
      </Header>
      <FormBox>
        <form>
          <InputBox>
            <label>이름</label>
            <br />
            <input
              value={username}
              type="text"
              name="username"
              placeholder="이름을 입력해주세요"
              onChange={onHandleUserName}
            />
          </InputBox>
          <InputBox>
            <label>아이디</label>
            <br />
            <input
              value={userId}
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요"
              onChange={onHandleUserId}
            />
            <button
              style={{
                marginTop: "5px",
                color: "white",
                backgroundColor: "black",
              }}
            >
              중복검사
            </button>
          </InputBox>
          <InputBox>
            <label>비밀번호</label>
            <br />
            <input
              value={password}
              type="password"
              name="password"
              placeholder="8~15자리 사이로 입력해주세요"
              onChange={onHandlePassword}
            />
            <p style={{ color: "red" }}>{pdText}</p>
          </InputBox>
          <InputBox>
            <label>비밀번호 확인 </label>
            <br />
            <input
              value={passwordConfirm}
              type="password"
              name="password-confirm"
              placeholder="비밀번호를 다시한번 입력해주세요"
              onChange={onHandlePasswordConfirm}
            />
            <p style={{ color: "red" }}>{pdCheckText}</p>
          </InputBox>
          <InputBox>
            <label>휴대전화 번호</label>
            <br />
            <input
              value={phone}
              type="text"
              name="number"
              placeholder="휴대전화 번호를 입력해주세요"
              onChange={onHandlePhoneNumber}
            />
          </InputBox>
          <InputBox>
            <label>이메일</label>
            <br />
            <input
              value={email}
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요."
              onChange={onHandleEmail}
            />
          </InputBox>
        </form>

        <RegisterButton onClick={onClickNext}>다음</RegisterButton>
      </FormBox>
    </>
  );
};

export default Register;
