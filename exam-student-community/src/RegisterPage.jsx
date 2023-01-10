import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
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

const RegisterPage = () => {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [gender, setGender] = useState(0); // 0: 선택 x , 1 : 남성 , 2 : 여성

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

  return (
    <>
      <Header>
        <Button onClick={onClickPrev}>
          <i class="fa-solid fa-chevron-left"></i>
        </Button>
        <Title>회원가입({page}/2)</Title>
        <Button>
          <i class="fa-solid fa-ellipsis-vertical"></i>
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
                type="password"
                name="password"
                placeholder="8~30자리 사이로 입력해주세요"
              />
            </InputBox>
            <InputBox>
              <Label>비밀번호 확인 </Label>
              <br />
              <Input
                type="password"
                name="password-confirm"
                placeholder="8~30자리 사이로 입력해주세요"
              />
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

export default RegisterPage;
