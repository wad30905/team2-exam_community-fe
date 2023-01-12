import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IconBackBtn, IconMoreBtn } from "../molecules/atoms/icons";
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Button = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
  font-size: 15px;
`;

const FormBox = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const InputBox = styled.div`
  padding: 10px;
`;

const Input = styled.input`
  margin-top: 10px;
  width: 100%;
  padding: 7px;
`;

const Label = styled.label`
  color: gray;
  font-weight: 700;
`;

const RegisterButton = styled.button`
  background-color: gray;
  color: white;
  border: none;
  width: 100%;
  font-size: 20px;
  padding: 5px;
  &:hover {
    background-color: #5928e5;
  }
`;

const GenderCheckBtn = styled.button`
  color: black;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: none;
  &:hover {
    background-color: #5928e5;
    color: white;
  }
`;

const Register = () => {
  const [page, setPage] = useState<number>(1);
  const [email, setEmail] = useState<string>(""); // 이메일
  const [username, setUsername] = useState<string>(""); // 유저 이름
  const [userId, setUserId] = useState<string>(""); // 아이디
  const [gender, setGender] = useState<number>(0); // 0: 선택 x , 1 : 남성 , 2 : 여성
  const [password, setPassword] = useState<string>(""); // 비번
  const [passwordConfirm, setPasswordConfirm] = useState<string>(""); // 비번 확인
  const [pdCheckText, setPdCheckText] = useState<string>("");

  const onClickNext = () => {
    const num = page + 1;
    if (num > 2) {
      return;
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const onClickPrev = () => {
    const num = page - 1;
    if (num < 1) {
      return;
    } else {
      setPage((prev) => prev - 1);
    }
  };
  const onHandlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 확인
    const pd = e.target.value;
    console.log(pd);
    if (pd !== password) {
      setPdCheckText("동일한 비밀번호를 입력하세요");
    } else if (pd === password) {
      setPdCheckText("");
    }
  };

  const onHandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <Header>
        <Button onClick={onClickPrev}>
          <IconBackBtn />
        </Button>
        <Title>회원가입({page}/2)</Title>
        <Button>
          <IconMoreBtn />
        </Button>
      </Header>
      <FormBox>
        {page === 1 ? (
          <form>
            <InputBox>
              <Label>이름</Label>
              <br />
              <Input
                type="text"
                name="username"
                placeholder="이름을 입력해주세요"
              />
            </InputBox>
            <InputBox>
              <Label>아이디</Label>
              <br />
              <Input
                type="text"
                name="id"
                placeholder="아이디를 입력해주세요"
              />
            </InputBox>
            <InputBox>
              <Label>비밀번호</Label>
              <br />
              <Input
                value={password}
                type="password"
                name="password"
                placeholder="8~30자리 사이로 입력해주세요"
                onChange={onHandlePassword}
              />
            </InputBox>
            <InputBox>
              <Label>비밀번호 확인 </Label>
              <br />
              <Input
                type="password"
                name="password-confirm"
                placeholder="8~30자리 사이로 입력해주세요"
                onChange={onHandlePasswordConfirm}
              />
              <p style={{ color: "red" }}>{pdCheckText}</p>
            </InputBox>
            <InputBox>
              <Label>휴대전화 번호</Label>
              <br />
              <Input
                type="number"
                name="number"
                placeholder="휴대전화 번호를 입력해주세요"
              />
            </InputBox>
            <InputBox>
              <Label>이메일</Label>
              <br />
              <Input
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요."
              />
            </InputBox>
          </form>
        ) : (
          <div>
            <p style={{ color: "gray", fontWeight: "700" }}>성별</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <GenderCheckBtn>남성</GenderCheckBtn>
              <GenderCheckBtn>여성</GenderCheckBtn>
            </div>
            <Label>공부기간</Label>
            <br />
            <div
              style={{
                alignItems: "center",
                marginBottom: "20px",
                marginTop: "10px",
              }}
            >
              <select style={{ width: "70%" }}>
                <option>--선택--</option>
                <option>1년 미만</option>
                <option>1년~2년</option>
                <option>2년~3년</option>
                <option>3년 이상</option>
              </select>
            </div>
          </div>
        )}

        <RegisterButton onClick={onClickNext}>
          {page === 1 ? "다음" : "가입완료"}
        </RegisterButton>
      </FormBox>
    </>
  );
};

export default Register;
