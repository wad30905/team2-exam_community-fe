import axios from "axios";

export const SERVER_URL = "http://localhost:8080";

// auth check
// 각 컴포넌트마다 위에 실행할 auth check
// 얘는 get 요청 쏴서, 쿠키가지고 사용자인증.

export async function authCheck() {
  const response = await axios({
    method: "get",
    url: `/auth`,
    withCredentials: true,
  });
  if (response.data.isAuthenticated) {
    console.log("authCheck / 유저 맞음");
    console.log("response :", response);
  } else {
    console.log("authCheck / 유저 아님");
  }
  //  catch (error) {
  //   console.error(error);
  //   return false;
  // }
  return response.data;
}

// 첫 로그인 처리 api
// 얘는 form 데이터 post 해줘서 사용자 인증
export async function loginCheck(dataId: string, dataPw: string) {
  // 서버에 입력데이터 보내주는 코드 (서버에서 유효성 체크)
  // response 값에 따라 true / false 반환.
  const response = await axios({
    method: "post",
    url: `/login`,
    data: {
      user_id: dataId,
      user_pw: dataPw,
    },
    withCredentials: true,
  });
  if (response.data) {
    //로그인 성공
    console.log("loginCheck / 유저 맞음");
  } else {
    //로그인 실패
    console.log("loginCheck / 유저 아님");
  }

  // 로그인 실패 (에러 관련)
  // .catch((error) => {
  //   console.log("서버 에러 :", error);
  // });
  return response.data;
  // ---------------------------------------------------------------------------
}
