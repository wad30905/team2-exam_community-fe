import { useEffect } from "react";
import axios from "axios";

export const SERVER_URL = "http://172.30.1.38:8080";

// auth check
// 각 컴포넌트마다 위에 실행할 auth check
// 얘는 get 요청 쏴서, 쿠키가지고 사용자인증.
export function authCheck() {
  // 사용자인지 체크하는 함수
  // 사용자가 맞으면 true / 아니면 false를 반환함.
  try {
    axios
      .get(`${SERVER_URL}/auth`)
      // auth 맞음
      .then((response) => {
        if (response.data.authenticated) {
          console.log("User is authenticated");
          return true;
        } else {
          console.log("User is not authenticated");
          return false;
        }
      });
  } catch (error) {
    console.log(error);
  }
}

// 첫 로그인 관련
// 얘는 form 데이터 post 해줘서 사용자 인증
export function loginCheck(dataId: string, dataPw: string) {
  // Validate data here
  // Submit the form to the server
  // ------------------------------------------------------
  // 서버에서 아이디/비번 유효성 체크 (서버에 보내주는 코드)
  // 서버에다가 post 요청 후 userState에 저장하기
  axios({
    method: "post",
    url: `${SERVER_URL}/login`,
    data: {
      id: dataId,
      password: dataPw,
    },
  })
    //로그인 성공
    .then((response) => {
      console.log(response);
      return true;
    })
    //로그인 실패
    .catch((error) => {
      console.log(error);
    });
  return false;
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
