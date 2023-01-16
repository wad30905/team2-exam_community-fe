import axios from "axios";

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

export async function fetchBlogs(blogsId: string) {
  return axios({
    method: "get",
    url: `${SERVER_URL}/blogs/:id`,
    data: {
      blogsId,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("서버 에러 :", error);
    });
}

export async function fetchBoards() {
  const response = await axios({
    method: "get",
    withCredentials: true,
    url: `${SERVER_URL}/blogs`,
  });
  console.log("fetchBoards :", response);
  return response.data;
}

// export function fetchBoards() {
//   return axios<IBoards[]>({
//     method: "get",
//     url: `/blogs`,
//   })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log("서버 에러 :", error);
//     });
// }

export async function fetchBlog(id: string) {
  const response = await axios({
    method: "get",
    withCredentials: true,
    url: `${SERVER_URL}/detail/${id}`,
  });
  console.log("fetchBoards :", response);
  return response;
}

export function writeBlog(
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

export function fetchBoard() {
  axios({
    method: "get",
    url: `${SERVER_URL}/detail/1`,
  })
    .then((response) => {
      console.log(response);
      console.log("성공");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
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

//   export function writeComment(
//     user_name: string,
//     title: string,
//     num: string,
//     content: string
//   ) {
//     axios({
//       method: "post",
//       url: `${SERVER_URL}/detail`,
//       data: {
//         user_name,
//         title,
//         num,
//         content,
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         return true;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     return false;
//   }
export function deleteBlog() {
  axios({
    method: "delete",
    url: `${SERVER_URL}/detail/1`,
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
