import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IconBackBtn, IconMoreBtn } from "../molecules/atoms/icons";
import { useNavigate } from "react-router-dom";
import {
  Header,
  RegisterButton,
  InputBox,
  RegisterForm,
  RegisterContainer,
  RegisterBackBtn,
} from "../molecules/atoms/styled";
import { useForm } from "react-hook-form";
import { checkId, SERVER_URL } from "../../api";
import { useSetRecoilState } from "recoil";
import {
  registerName,
  registerId,
  registerPd,
  registerPhone,
  registerEmail,
} from "../../store/atoms";
import { theme } from "../../lib/StyledComponents/theme";

interface IForm {
  username: string;
  // userId: string;
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
  const [isActive, setIsActive] = useState(true); // 버튼 활성화 변수
  const [idCheck, setIdCheck] = useState(false); // 아이디 중복 체크 확인 변수
  const [userId, setUserId] = useState(""); // 아이디 변수
  const [idError, setIdError] = useState(""); // 아이디 에러 체크
  const handleIdDoubleCheck = () => {
    // 아이디 중복 체크 실행
    // API 호출
    if (userId === "") {
      alert("아이디를 입력해 주세요.");
      return;
    }
    axios({
      method: "post",
      url: `${SERVER_URL}/id_compare`,
      data: {
        user_id: userId,
      },
    }).then((response) => {
      console.log(response.data.boo);
      if (response.data.boo) {
        // 사용 가능
        setIdError("");
        alert("해당 아이디는 사용 가능한 아이디 입니다.");
        setIdCheck(true);
      } else {
        setIdError("");
        alert("해당 아이디는 이미 사용중인 아이디 입니다.");
        setIdCheck(false);
      }
    });
  };
  const handleIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setUserId(e.currentTarget.value);
    setIdCheck(false);
  };

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
    if (userId == "") {
      setIdError("아이디를 입력해주세요.");
      return false;
    }

    if (!idCheck) {
      setIdError("아이디 중복검사를 해주세요");
      return false;
    }

    // recoil에 데이터 저장.
    setName(data.username);
    setId(userId);
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
    <RegisterContainer>
      <Header>
        <RegisterBackBtn onClick={onClickPrev}>
          {/* <IconBackBtn /> */}
          이전
        </RegisterBackBtn>
        <h1>회원가입(1/2)</h1>
        <button style={{ visibility: "hidden" }}>
          {/* <IconMoreBtn /> */}
        </button>
      </Header>

      <RegisterForm onSubmit={handleSubmit(onValid)}>
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
          <p style={{ color: "red" }}>{errors?.username?.message}</p>
        </InputBox>
        <InputBox short={true}>
          <label>아이디</label>
          <br />
          <input
            value={userId}
            onChange={handleIdChange}
            type="text"
            placeholder="아이디를 입력해주세요"
          />
          <button
            onClick={handleIdDoubleCheck}
            type="button"
            style={{
              marginTop: "5px",
              color: "white",
              backgroundColor: "black",
              margin: "10px",
              cursor: "pointer",
            }}
          >
            중복검사
          </button>
          <p style={{ color: "red" }}>{idError}</p>
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
          <p style={{ color: "red" }}>{errors?.password?.message}</p>
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
          <p style={{ color: "red" }}>{errors?.passwordConfirm?.message}</p>
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
          <p style={{ color: "red" }}>{errors?.phone?.message}</p>
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
          <p style={{ color: "red" }}>{errors?.email?.message}</p>
        </InputBox>
        <RegisterButton type="submit" className={isActive ? "active" : ""}>
          다음
        </RegisterButton>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
