import React, { useState } from "react";
import styled from "styled-components";
import {
  Header,
  GenderCheckBtn,
  RegisterButton,
  RegisterForm,
} from "../molecules/atoms/styled";
import { IconBackBtn, IconMoreBtn } from "../molecules/atoms/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  registerName,
  registerId,
  registerPd,
  registerPhone,
  registerEmail,
} from "../../store/atoms";
import { registerUser } from "../../api";

const Register2 = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [time, setTime] = useState("");
  const [femaleCheck, setFemaleCheck] = useState(false);
  const [maleCheck, setMaleCheck] = useState(false);
  const [name, modName] = useRecoilState(registerName);
  const [id, modId] = useRecoilState(registerId);
  const [password, modPd] = useRecoilState(registerPd);
  const [phone, modPhone] = useRecoilState(registerPhone);
  const [email, modEmail] = useRecoilState(registerEmail);
  const onClickPrev = () => {
    navigate("/register1");
  };

  const onClickRegisterBtn = () => {
    // 가입완료 버튼

    if (gender === "") {
      alert("성별을 선택해주세요.");
      return false;
    }
    if (time === "") {
      alert("공부한 기간을 선택해주세요.");
      return false;
    }
    const time_num = Number(time);

    // 회원가입 API 호출
    registerUser(name, id, password, phone, email, gender, time);
    //console.log(name, id, password, phone, email, gender, time_num);

    alert("회원가입을 완료했습니다.");
    modName("");
    modPd("");
    modEmail("");
    modPhone("");
    modId("");
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
  const handleChangeSelect = (e: any) => {
    setTime(e.target.value);
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

      <RegisterForm>
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
            type="button"
            name="m"
            onClick={onClickMaleBtn}
            className={maleCheck ? "on" : ""}
          >
            남성
          </GenderCheckBtn>
          <GenderCheckBtn
            type="button"
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
          <select style={{ width: "50%" }} onChange={handleChangeSelect}>
            <option value="">--선택--</option>
            <option value="1">1년 이하</option>
            <option value="2">1년~2년</option>
            <option value="3">2년~3년</option>
            <option>3년 이상</option>
          </select>
        </div>
        <RegisterButton onClick={onClickRegisterBtn}>가입완료</RegisterButton>
      </RegisterForm>
    </>
  );
};

export default Register2;
