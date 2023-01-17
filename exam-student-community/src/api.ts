import axios, { Axios, AxiosError, AxiosResponse } from "axios";

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
    url: `${SERVER_URL}/posts`,
  });
  console.log("getBoards :", response);
  return response.data;
}

export async function getPosts(postsId: number) {
  return axios({
    method: "get",
    url: `${SERVER_URL}/posts/:id`,
    data: {
      postsId: postsId,
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
  num: string,
  title: string,
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
// {posts:number, ~~~ , comments:[{commenter:"string", commentcontent:"string"},{}]}

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

export function deletePost() {
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

// kuk329 : 회원가입 처리 API
export async function registerUser(
  name: string,
  id: string,
  pd: string,
  phone: string,
  email: string,
  gender: string,
  age: number
) {
  // 유저 객체로 받음.
  // response 값에 따라 true / false 반환.
  const response = await axios({
    method: "post",
    url: `${SERVER_URL}/register`,
    data: {
      name: name, // 이름
      user_id: id, // 아이디
      user_pw: pd, // 비번
      phone: phone,
      email: email,
      gender: gender,
      age: age,
    },
    withCredentials: true,
  });
  if (response.data) {
    //로그인 성공
    console.log("회원가입 성공");
  } else {
    //로그인 실패
    console.log("회원가입 실패");
  }
}

// 아이디 중복 확인 API
export async function checkId(userId: string) {
  // response 값에 따라 true / false 반환.
  axios({
    method: "get",
    url: `${SERVER_URL}/id_compare`,
    data: {
      user_id: userId, // 아이디
    },
  }).then((response) => {
    console.log(response.data);
    return response.data;
  });
}
