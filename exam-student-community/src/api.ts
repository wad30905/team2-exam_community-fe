import axios from "axios";
import { IBoards } from "./components/pages/Main";

export const SERVER_URL = "http://localhost:8080";

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
  }}

export function fetchBlogs(blogsId: string) {
  return (
    axios({
      method: "get",
      url: `'/blogs/:id'`,
      data: {
        blogsId,
      },
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log("서버 에러 :", error);
      })
  )
}


export function fetchBoards() {
  return (
    axios<IBoards[]>({
      method: "get",
      url: `/blogs`,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("서버 에러 :", error);
      })
  )
}

export function fetchBlog() {
  return (
    axios({
      method: "get",
      url: `/detail/:id'`,
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log("서버 에러 :", error);
      })
  )
}

export function writeBlog(user_name: string, title: string, num:string, content: string ) {
  axios({
    method: "post",
    url: `${SERVER_URL}/detail`,
    data: {
      user_name,
      title,
      num,
      content,
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
};
