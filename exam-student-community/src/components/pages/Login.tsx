import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SetRecoilState, useRecoilState } from "recoil";
import { userState } from "../../store/atoms";

interface IForm {
  id: string;
  password: string;
}

const sampleId = {
  sampleId1: "samplePassword1",
  sampleId2: "samplePassword2",
  sampleId3: "samplePassword3",
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const [user, setUser] = useRecoilState(userState);

  function onSubmit(data: IForm) {
    // Validate data here
    // Submit the form to the server
    // ------------------------------------------------------
    // 서버에서 아이디/비번 유효성 체크 (서버에 보내주는 코드)
    // 서버에다가 post 요청 후 userState에 저장하기
    axios({
      method: "post",
      url: "http://192.168.187.137/user/login",
      data: {
        id: data.id,
        password: data.password,
      },
    }).then((res) => {
      // [정상 로그인]res 에는 id:string, password:string, token:string,
      // [로그인 안되면] res에는 error:string 에다가 에러메시지 담아주기
      if (res.status === 401) {
        alert("에러메시지");
      } else {
        // 로그인 성공하면 200 status code반환
        // 로그인 실패하면 401 status code반환
        // 해당 코드는 구글링 해보기
        document.location.href = "/";
      }
    });
    // ---------------------------------------------------------------------------
    // // 리액트에서 아이디/비번 유효성 체크
    // // ID CHECK
    // if (Object.keys(sampleId).includes(data.id)) {
    //   // ID TRUE
    //   // PASSWORD CHECK
    //   //// 수정소요 : sample 데이터에서, data.id를 뽑아내는 코드 수정 필요 (현재는 sampleId1 으로 뽑음)
    //   if (sampleId.sampleId1 === data.password) {
    //     console.log("login success");
    //     setUser({ id: "id", password: "2" });
    //     // document.location.href = "/";
    //   } else {
    //     setError(
    //       "password",
    //       { message: "잘못된 비밀번호입니다." },
    //       { shouldFocus: true }
    //     );
    //   }
    // } else {
    //   // ID FALSE
    //   setError(
    //     "id",
    //     { message: "잘못된 아이디입니다." },
    //     { shouldFocus: true }
    //   );
    // }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email:
        <input
          {...register("id", {
            required: "아이디를 입력해주세요",
          })}
          name="id"
          type="id"
        />
        <span>{errors?.id?.message}</span>
      </label>
      <br />
      <label>
        Password:
        <input
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
          type="password"
          name="password"
        />
        <span>{errors?.password?.message}</span>
      </label>
      <br />
      <button type="submit">Log in</button>
      <button
        onClick={() => {
          console.log("userState : ", userState);
        }}
      >
        state체크
      </button>
    </form>
  );
}

export default Login;
