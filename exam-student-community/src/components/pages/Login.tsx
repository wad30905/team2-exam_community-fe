import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginForm } from "../molecules/atoms/styled";
import { useNavigate } from "react-router-dom";
import TopBar from "../molecules/TopBar";
import Dropdown from "../molecules/Dropdown";
import { loginCheck, kakaoLogin } from "../../api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../store/atoms";
import Kakao from "kakao-js-sdk";

interface IForm {
  id: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  function onSubmit(data: IForm) {
    const checkLogin = async () => {
      const loginStatus = await loginCheck(data.id, data.password);
      console.log("loginStatus : ", loginStatus);
      setIsLoggedIn(loginStatus);
      console.log("navigate()");
      navigate("/");
    };
    checkLogin();
    // console.log("로그인페이지");
    // console.log("isLoggedIn : ", isLoggedIn);
    // setIsLoggedIn(true);
    // navigate("/");
  }

  return (
    <>
      <TopBar
        id={undefined}
        mainService={"로그인"}
        needWrite={false}
        needSearch={false}
      />
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <label>아이디</label>
        <input
          {...register("id", {
            required: "아이디를 입력해주세요",
          })}
          name="id"
          type="id"
        />
        <span className="errorMessage">{errors?.id?.message}</span>

        <br />
        <label>비밀번호</label>
        <input
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
          type="password"
          name="password"
        />
        <span className="errorMessage">{errors?.password?.message}</span>
        <br />
        <button type="submit">로그인</button>
        <div className="signUpBox">
          <Link to="/register">아이디 찾기</Link>
          <Link to="/register">비밀번호 찾기</Link>
          <Link to="/register1">회원가입</Link>
        </div>

        <img
          onClick={kakaoLogin}
          style={{
            height: "auto",
            width: "100%",
            cursor: "pointer",
            margin: "0 auto",
          }}
          src="https://asp.pointpark.com/PlusPointMember/resources/images/mobileHomePage/btn_kakao.png"
        />
      </LoginForm>
    </>
  );
}

export default Login;
