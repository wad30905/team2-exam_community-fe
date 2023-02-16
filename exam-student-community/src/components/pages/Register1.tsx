import React, { useEffect, useState } from "react";

import {
  IconBackBtn,
  IconMoreBtn,
  IconPdHide,
  IconPdShow,
} from "../molecules/atoms/icons";
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
import { checkId, idDoubleCheck, SERVER_URL } from "../../api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  registerName,
  registerId,
  registerPd,
  registerEmail,
  restrict,
} from "../../store/atoms";

interface IForm {
  username: string;
  // userId: string;
  password: string;
  passwordConfirm: string;
  email: string;
  // phone: string;
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
  const [pdShow, setPdShow] = useState(false);
  const [pdCheckShow, setPdCheckShow] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [nickName, setNickName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPd, setUserPd] = useState("");
  const [userPdCheck, setUserPdCheck] = useState("");
  // recoil
  const [registerName_, setName] = useRecoilState(registerName);
  const [registerId_, setId] = useRecoilState(registerId);
  const [registerPd_, setPd] = useRecoilState(registerPd);
  // const [registerPhone_, setPhone] = useRecoilState(registerPhone);
  const [registerEmail_, setEmail] = useRecoilState(registerEmail);
  const [pageRestrict, setPageRestrict] = useRecoilState(restrict);

  const handlePhoneNumChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPhoneNum(e.currentTarget.value);
  };

  useEffect(() => {
    // console.log(registerPhone_);
    setNickName(registerName_);
    setUserId(registerId_);
    setUserPd(registerPd_);
    setUserPdCheck(registerPd_);
    setUserEmail(registerEmail_);
    //   setPhoneNum(registerPhone_);
  }, []);

  // useEffect(() => {
  //   setPhoneNum(
  //     phoneNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
  //   );
  // }, [phoneNum]);

  const handleIdDoubleCheck = async () => {
    // 아이디 중복 체크 실행
    // API 호출
    if (userId === "") {
      alert("아이디를 입력해 주세요.");
      return;
    }
    const response = await idDoubleCheck(userId);
    console.log("response :", response);
    if (response === "에러") return false;
    if (response) {
      setIdError("");
      alert("해당 아이디는 사용 가능한 아이디 입니다.");
      setIdCheck(true);
    } else {
      setIdError("");
      alert("해당 아이디는 이미 사용중인 아이디 입니다.");
      setIdCheck(false);
    }
  };

  const handleIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setUserId(e.currentTarget.value);
    setIdCheck(false); // todo false로 변경
  };

  const handleChangePdShow = () => {
    setPdShow((prev) => !prev);
  };

  const handleChangePdCheckShow = () => {
    setPdCheckShow((prev) => !prev);
  };

  const handleChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };

  const handleChangePd = (e: React.FormEvent<HTMLInputElement>) => {
    setUserPd(e.currentTarget.value);
  };

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setUserEmail(e.currentTarget.value);
  };

  const handleChangePdCheck = (e: React.FormEvent<HTMLInputElement>) => {
    setUserPdCheck(e.currentTarget.value);
  };

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
    // setPhone(data.phone);
    setEmail(data.email);
    setPageRestrict(false);
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
          <label>닉네임/이름</label>
          <br />
          <input
            {...register("username", {
              required: "닉네임/이름 입력은 필수입니다.",
            })}
            type="text"
            name="username"
            placeholder="닉네임/이름을 입력해주세요"
            value={nickName}
            onChange={handleChangeName}
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
        <InputBox short={true}>
          <label>비밀번호</label>
          <br />
          <input
            {...register("password", {
              required: "비밀번호 입력은 필수입니다.",
              minLength: {
                value: 8,
                message: "최소 8자리로 입력해주세요.",
              },
            })}
            type={pdShow ? "text" : "password"}
            name="password"
            placeholder="8자리 이상 입력해 주세요."
            value={userPd}
            onChange={handleChangePd}
          />
          <button
            onClick={handleChangePdShow}
            type="button"
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "20px",
            }}
          >
            {pdShow ? <IconPdHide /> : <IconPdShow />}
          </button>
          <p style={{ color: "red" }}>{errors?.password?.message}</p>
        </InputBox>
        <InputBox short={true}>
          <label>비밀번호 확인 </label>
          <br />
          <input
            {...register("passwordConfirm", {
              required: "빈칸을 입력해주세요.",
            })}
            type={pdCheckShow ? "text" : "password"}
            placeholder="비밀번호를 다시한번 입력해주세요"
            value={userPdCheck}
            onChange={handleChangePdCheck}
          />
          <button
            onClick={handleChangePdCheckShow}
            type="button"
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "20px",
            }}
          >
            {pdCheckShow ? <IconPdHide /> : <IconPdShow />}
          </button>
          <p style={{ color: "red" }}>{errors?.passwordConfirm?.message}</p>
        </InputBox>

        {/* <InputBox short={true}>
          <label>핸드폰 번호</label>
          <br />
          <input
            {...register("phone", {
              required: "번호를 입력은 필수입니다.",
            })}
            type="text"
            placeholder="번호를 입력해주세요"
            value={phoneNum}
            onChange={handlePhoneNumChange}
          />
          <p style={{ color: "red" }}>{errors?.phone?.message}</p>
        </InputBox> */}
        <InputBox short={true}>
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
            value={userEmail}
            onChange={handleChangeEmail}
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
