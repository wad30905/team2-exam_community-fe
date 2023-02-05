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
    console.log("유저 맞을 때 response :", response);
  } else {
    console.log("유저 아닐 때 response:", response);
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
  return response;
  // console.log(response);
  // if (response.status) {
  //   console.log("로그인 성공");
  // } else {
  //   loginFail();
  // }
  // console.log("post 로그인 response : ", response);
  // if (response.data) {
  //   console.log("loginCheck / 유저 맞음");
  // } else {
  //   console.log("loginCheck / 유저 아님");
  // }
}

// 로그인 실패 api
// 확인필요
export async function loginFail() {
  const response = await axios({
    method: "get",
    url: `${SERVER_URL}/fail_login`,
  });
  console.log("loginFail response :", response);
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

export async function getPosts(boardId: number) {
  return axios({
    method: "get",
    url: `${SERVER_URL}/blogs/${boardId}`,
    data: {
      boardId,
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

  return response.data;
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
      title,
      num,
      content,
      hide_user: false,
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

export function fixPost(
  id: number,
  title: string,
  content: string,
  hide_user: boolean
) {
  axios({
    method: "put",
    url: `${SERVER_URL}/detail/${id}`,
    data: {
      title,
      content,
      hide_user,
    },
  })
    .then((response) => {
      console.log(response);
      console.log("수정 성공");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
  return false;
}

export function deletePost(postId: number | undefined) {
  axios({
    method: "delete",
    url: `${SERVER_URL}/detail/${postId}`,
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

export async function writeComment(newComment: string, post_key: string) {
  const response = await axios({
    method: "post",
    url: `/comment`,
    data: {
      // post_key: 게시물id,
      content: newComment,
      post_key: post_key,
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

export function timeCalculator(date: string | null) {
  if (date) {
    let startDate = date.replace("T", " ");
    startDate = startDate.slice(0, 16);

    const start = new Date(startDate);
    start.setHours(start.getHours() + 9);
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
  age: string
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

// 검색하면, 해당 게시물 띄워주기
export async function searchPosts(keyword: string | undefined, mode: any) {
  let datakey = "";
  if (mode === "1") {
    datakey = "title";
  } else {
    datakey = "user_id";
  }
  const response = await axios({
    method: "post",
    url: `${SERVER_URL}/findpost/${mode}`,
    data: {
      [datakey]: keyword,
    },
  });
  if (response.data) {
    console.log("response :", response);
    const posts = response.data;
    return posts;
  } else {
    console.log("response :", response);
    const posts = null;
    return posts;
  }
}

// 로그아웃
export function logout() {
  axios({
    method: "post",
    url: `${SERVER_URL}/logout`,
  });
}

export const getProfile = async () => {
  const response = await axios({
    method: "get",
    url: `/register`,
  });
  if (200) {
    // 잘 들어갔으면
    console.log("getProfile response :", response);
    return response.data; // 다시 댓글목록 받아오기
    // response.data 형식 어떤지는 다시 봐야함
  } else {
    console.log("에러");
  }
};

export const updateProfile = async (data: any) => {
  const { age, name, email, phone, gender } = data;
  console.log("server에 들어온 data :", data);
  const response = await axios({
    method: "post",
    url: `/mypage`,
    data: {
      name,
      age,
      email,
      phone,
      gender,
    },
  });
  if (200) {
    // 잘 들어갔으면
    console.log("mypage response : ", response);
    return response;
  } else {
    console.log("에러");
  }
};

// 카카오 로그인

export interface IKakaoAuthData {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}

export const getKakaoToken = async (data: IKakaoAuthData) => {
  const response = await axios({
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    method: "post",
    url: "https://kauth.kakao.com/oauth/token",
    data,
  });
  console.log("받아온 토큰(access, refresh 둘다 있음) :", response);
  return response.data;
};

export const sendKakaoTokenToServer = async (token: string) => {
  const response = await axios({
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    method: "post",
    url: "/auth/kakao",
    data: {
      token,
    },
  });
  console.log("서버에 전송완료");
  if (response.status == 201 || response.status == 200) {
    // 성공하면 할거
    // 브라우저 로컬스토리지, 쿠키 등에 토큰 박는 코드
    console.log("로그인 성공");
  } else {
    window.alert("로그인에 실패하였습니다.");
  }
};
