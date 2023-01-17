<<<<<<< HEAD

import axios, {Axios, AxiosError, AxiosResponse} from "axios";
=======
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
>>>>>>> 5c9e3c6984dc4cb524ef13d526a2118c94e176e0

// export const SERVER_URL = "http://172.20.10.10:8080"; // hotspot
export const SERVER_URL = "";

export async function authCheck() {
  const response = await axios({
    method: "get",
    withCredentials: true,
    url: `${SERVER_URL}/login`,
  });
  if (response.data.isAuthenticated) {
    console.log("authCheck / 유저 맞음");
    console.log("response :", response);
  } else {
    console.log("유저 아님");
    console.log(response);
  }

  return response.data;
}

// 첫 로그인 처리 api
// 얘는 form 데이터 post 해줘서 사용자 인증
export async function loginCheck(dataId: string, dataPw: string) {
  const response = await axios({
    method: "post",
    url: `${SERVER_URL}/login`,
    data: {
      user_id: dataId,
      user_pw: dataPw,
    },
    withCredentials: true,
  });
  if (response.data) {
    console.log("loginCheck / 유저 맞음");
  } else {
    console.log("loginCheck / 유저 아님");
  }
}

export async function getBoards() {
  const response = await axios({
    method: "get",
    withCredentials: true,
    url: `${SERVER_URL}/blogs`,
  });
  console.log("getBoards :", response);
  return response.data;
}

export async function getPosts(postsId: number) {
  return axios({
    method: "get",
    url: `${SERVER_URL}/blogs/:id`,
    data: {
      blogsId: postsId,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("서버 에러 :", error);
    });
}

export async function getPost(id: number) {
  const response = await axios({
    method: "get",
    withCredentials: true,
    url: `${SERVER_URL}/detail/${id}`,
  });
  console.log("getPost :", response);
  return response;
}

export function writePost(
  user_name: string,
  title: string,
  num: string,
  content: string
) {
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
      console.log("작성 성공");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
  return false;
}

// data 생긴거 이렇다고 가정
// {blogs:number, ~~~ , comments:[{commenter:"string", commentcontent:"string"},{}]}

export async function writeComment(newComment: {
  commenter: string;
  commentcontent: string;
}) {
  const response = await axios({
    method: "post",
    url: `/comment`,
    data: {
      // post_key: 게시물id,
      content: newComment.commentcontent,
    },
  });
  if (200) {
    // 잘 들어갔으면
    console.log("response : ", response);
    return response; // 다시 댓글목록 받아오기
    // response.data 형식 어떤지는 다시 봐야함
  } else {
    console.log("에러");
  }
}
<<<<<<< HEAD
=======

export function deleteBlog() {
  axios({
    method: "delete",
    url: `${SERVER_URL}/detail/${1}`,
  })
    .then((response) => {
      console.log(response);
      console.log("삭제 성공");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function 게시물시간구하기(date: string | null) {
  if (date) {
    let startDate = date.replace("T", "-");
    startDate = startDate.slice(0, 15);
    const start = new Date(startDate);
    const end = new Date();

    const diff = ((end as any) - (start as any)) / 1000;

    const times = [
      { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
      { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
      { name: "일", milliSeconds: 60 * 60 * 24 },
      { name: "시간", milliSeconds: 60 * 60 },
      { name: "분", milliSeconds: 60 },
    ];

    for (const value of times) {
      const betweenTime = Math.floor(
        ((diff as any) / value.milliSeconds) as any
      );

      if (betweenTime > 0) {
        return `${betweenTime}${value.name} 전`;
      }
    }
    return "방금 전";
  }
}
>>>>>>> 5c9e3c6984dc4cb524ef13d526a2118c94e176e0
