import React, { useState } from "react";
import styled from "styled-components";
import {
  Header,
  GenderCheckBtn,
  FormBox,
  RegisterButton,
} from "../molecules/atoms/styled";
import { IconBackBtn, IconMoreBtn } from "../molecules/atoms/icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";

const Register2 = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [femaleCheck, setFemaleCheck] = useState(false);
  const [maleCheck, setMaleCheck] = useState(false);
  const onClickPrev = () => {
    navigate("/register1");
  };

  const onClickRegisterBtn = () => {
    // 가입완료 버튼
    // axios.post("url",data).then(function(response){

    // });
    alert("회원가입 완료");
    navigate("/login");
  };
  const onClickMaleBtn = (e: any) => {
    console.log(e.target.name);
    setGender(e.target.name);
    setMaleCheck(true);
    setFemaleCheck(false);
  };

  const onClickFemaleBtn = (e: any) => {
    console.log(e.target.name);
    setGender(e.target.name);
    setMaleCheck(false);
    setFemaleCheck(true);
  };
  return (
    <>
      <Header>
        <button onClick={onClickPrev}>
          <IconBackBtn />
        </button>
        <h1>회원가입(2/2)</h1>
        <button>
          <IconMoreBtn />
        </button>
      </Header>
      <FormBox>
        <p style={{ color: "gray", fontWeight: "700" }}>성별</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <GenderCheckBtn
            name="m"
            onClick={onClickMaleBtn}
            className={maleCheck ? "on" : ""}
          >
            남성
          </GenderCheckBtn>
          <GenderCheckBtn
            name="f"
            onClick={onClickFemaleBtn}
            className={femaleCheck ? "on" : ""}
          >
            여성
          </GenderCheckBtn>
        </div>
        <label>공부기간</label>
        <br />
        <div style={{ padding: "10px" }}>
          <select style={{ width: "50%" }}>
            <option>--선택--</option>
            <option>1년 미만</option>
            <option>1년~2년</option>
            <option>2년~3년</option>
            <option>3년 이상</option>
          </select>
        </div>
        <RegisterButton onClick={onClickRegisterBtn}>가입완료</RegisterButton>
      </FormBox>
    </>
  );
};

export default Register2;
