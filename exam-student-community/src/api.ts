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
      .get(`${SERVER_URL}/1`)
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

// 첫 로그인 처리 api
// 얘는 form 데이터 post 해줘서 사용자 인증
export function loginCheck(dataId: string, dataPw: string) {
  // 서버에 입력데이터 보내주는 코드 (서버에서 유효성 체크)
  // response 값에 따라 true / false 반환.
  axios({
    method: "post",
    url: `${SERVER_URL}/login`,
    data: {
      user_id: dataId,
      user_pw: dataPw,
    },
    withCredentials: true,
  })
    .then((response) => {
      if (response.data) {
        //로그인 성공
        console.log("response :", response);
        console.log("유저 맞음.");
        return true;
      } else {
        //로그인 실패
        console.log("response :", response);
        console.log("유저 아님.");
        return false;
      }
    })
    // 로그인 실패 (에러 관련)
    .catch((error) => {
      console.log("서버 에러 :", error);
    });
  return false;
  // ---------------------------------------------------------------------------
}
