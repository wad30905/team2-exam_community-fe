import { IPostData } from "../../pages/Post";

export const sampleBoards = [
  [
    [
      { title: "글1", comment_num: 100 },
      { title: "글2", comment_num: 100 },
      { title: "글3", comment_num: 100 },
    ],
    3,
  ],
  [
    [
      { title: "글1", comment_num: 100 },
      { title: "글2", comment_num: 100 },
    ],
    2,
  ],
  [
    [
      { title: "글1", comment_num: 100 },
      { title: "글2", comment_num: 100 },
    ],
    2,
  ],
  [
    [
      { title: "글1", comment_num: 100 },
      { title: "글2", comment_num: 100 },
    ],
    2,
  ],
  [
    [
      { title: "글1", comment_num: 100 },
      { title: "글2", comment_num: 100 },
    ],
    2,
  ],
  [
    [
      { title: "글4", comment_num: 100 },
      { title: "글5", comment_num: 100 },
    ],
    2,
  ],
  [
    [
      { title: "글5", comment_num: 100 },
      { title: "글6", comment_num: 100 },
    ],
    2,
  ],
  [
    [
      { title: "글5", comment_num: 100 },
      { title: "글6", comment_num: 100 },
    ],
    2,
  ],
];

export const samplePosts: IPostData[] = [
  {
    post_detail: {
      c_date: "2022-10-01",
      d_date: "2022-10-01",
      m_date: "2022-10-01",
      click_num: 1,
      comment_num: 2,
      content: "ㅁㄴㄻㄴㅇㄹ",
      is_user_hid: true,
      id: 123,
      like: 1,
      num: 1,
      title: "제곧내",
      user_name: "ㅁㄴㅇㄻ",
    },
    post_comments: [
      { user_name: "asdf", content: "12sdlf;jlasd", c_date: "2022-10-01" },
    ],
  },
];

export const samplePost = {
  post_detail: {
    c_date: "2022-10-01",
    d_date: "2022-10-01",
    m_date: "2022-10-01",
    click_num: 1,
    comment_num: 2,
    content: "ㅁㄴㄻㄴㅇㄹ",
    is_user_hid: true,
    id: 123,
    like: 1,
    num: 1,
    title: "제곧내",
    user_id: "ㅁㄴㅇㄻ",
  },
  post_comments: [
    { user_id: "asdf", content: "12sdlf;jlasd", c_date: "2022-10-01" },
  ],
};

export const PostsList = ["1", "2", "3", "4", "5", "6"];

interface BoardsObject {
  [key: string]: string;
}

export const BoardsObject: BoardsObject = {
  "1": "자유게시판",
  "2": "정보게시판",
  "3": "LEET게시판",
  "4": "CPA게시판",
  "5": "공부시간 인증",
  "6": "공부시간 인증",
  "7": "공부시간 인증",
  "8": "공부시간 인증",
  "9": "공부시간 인증",
  "10": "공부시간 인증",
};
