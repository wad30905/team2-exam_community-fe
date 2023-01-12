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
};

export function writeBlog(user_name: string, title: string, num:string, content: string ) {
  axios({
    method: "post",
    url: `${SERVER_URL}/detail`,
    data: {
      user_name,
      title,
      num,
      content
    },
  })
    .then((response) => {
      console.log(response);
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
    return false;
}