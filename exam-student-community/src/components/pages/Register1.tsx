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
import { useForm } from "react-hook-form";
import { checkId } from "../../api";
import { useSetRecoilState } from "recoil";
import {
  registerName,
  registerId,
  registerPd,
  registerPhone,
  registerEmail,
} from "../../store/atoms";

interface IForm {
  username: string;
  userId: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phone: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const setName = useSetRecoilState(registerName);
  const setId = useSetRecoilState(registerId);
  const setPd = useSetRecoilState(registerPd);
  const setPhone = useSetRecoilState(registerPhone);
  const setEmail = useSetRecoilState(registerEmail);

  const onValid = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError("passwordConfirm", { message: "비밀번호가 다릅니다." });
      return false;
    }


    // recoil에 데이터 저장.
    setName(data.username);
    setId(data.userId);
    setPd(data.password);
    setPhone(data.phone);
    setEmail(data.email);

    navigate("/register2"); // 다음 페이지로 이동.
  };

  const navigate = useNavigate();
  const onClickPrev = () => {
    navigate("/login");
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
        <form onSubmit={handleSubmit(onValid)}>
          <InputBox>
            <label>이름</label>
            <br />
            <input
              {...register("username", {
                required: "이름을 입력은 필수입니다.",
              })}
              type="text"
              name="username"
              placeholder="이름을 입력해주세요"
            />
            <span style={{ color: "red" }}>{errors?.username?.message}</span>
          </InputBox>
          <InputBox>
            <label>아이디</label>
            <br />
            <input
              {...register("userId", {
                required: "아이디 입력은 필수입니다.",
                validate: (value) => {
                  // 아이디 중복 검사 API 호출
                  const res: any = checkId(value);
                  //  const res = "중복입니다";
                  if (res == "중복입니다") {
                    return "이미 사용중인 아이디입니다. ";
                  } else {
                    return true;
                  }
                },
              })}
              type="text"
              placeholder="아이디를 입력해주세요"
            />
            {/* <button
              style={{
                marginTop: "5px",
                color: "white",
                backgroundColor: "black",
              }}
            >
              중복검사
            </button> */}
            <span style={{ color: "red" }}>{errors?.userId?.message}</span>
          </InputBox>
          <InputBox>
            <label>비밀번호</label>
            <br />
            <input
              {...register("password", {
                required: "비밀번호 입력은 필수입니다.",
                minLength: {
                  value: 5,
                  message: "5~8 자리로 입력해주세요.",
                },
                maxLength: {
                  value: 8,
                  message: "5~8 자리로 입력해주세요.",
                },
              })}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요.(5~8자리)"
            />
            <span style={{ color: "red" }}>{errors?.password?.message}</span>
          </InputBox>
          <InputBox>
            <label>비밀번호 확인 </label>
            <br />
            <input
              {...register("passwordConfirm", {
                required: "빈칸을 입력해주세요.",
              })}
              type="password"
              placeholder="비밀번호를 다시한번 입력해주세요"
            />
            <span style={{ color: "red" }}>
              {errors?.passwordConfirm?.message}
            </span>
          </InputBox>
          <InputBox>
            <label>핸드폰 번호</label>
            <br />
            <input
              {...register("phone", {
                required: "번호를 입력은 필수입니다.",
              })}
              type="text"
              placeholder="번호를 입력해주세요"
            />
            <span style={{ color: "red" }}>{errors?.phone?.message}</span>
          </InputBox>
          <InputBox>
            <label>이메일</label>
            <br />
            <input
              {...register("email", {
                required: "이메일 입력은 필수입니다.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식을 지켜주세요.",
                },
              })}
              type="text"
              placeholder="이메일을 입력해주세요."
            />
            <span style={{ color: "red" }}>{errors?.email?.message}</span>
          </InputBox>
          <RegisterButton type="submit">다음</RegisterButton>
        </form>
      </FormBox>
    </>
  );
};

export default Register;
