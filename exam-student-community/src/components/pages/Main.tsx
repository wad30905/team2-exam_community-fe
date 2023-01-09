import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { userState } from "../../store/atoms";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SERVER_URL = "http://192.168.187.137";

export const sampleBoards = [
  {
    index: 0,
    name: "자유게시판",
    total_num: 123,
    posts: [
      {
        id: 0,
        title: "자유 post1",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 1,
        title: "자유 post2",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 2,
        title: "자유 post3",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 3,
        title: "자유 post4",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
    ],
  },
  {
    index: 1,
    name: "CPA 게시판",
    total_num: 123,
    posts: [
      {
        id: 4,
        title: "CPA post1",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 5,
        title: "CPA post2",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 6,
        title: "CPA post3",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 7,
        title: "CPA post4",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
    ],
  },
  {
    index: 2,
    name: "LEET 게시판",
    total_num: 123,
    posts: [
      {
        id: 8,
        title: "LEET post1",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 9,
        title: "LEET post2",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 10,
        title: "LEET post3",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
      {
        id: 11,
        title: "LEET post4",
        comment_num: 3,
        click_num: 100,
        writer: "손채환",
        m_date: 1,
        d_date: 3,
      },
    ],
  },
];

const Board = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.grayColor};
  font-size: 20px;
  padding: 20px 0px;
  .title_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    margin-bottom: 20px;

    .title {
      font-weight: 600;
    }
    .total_num {
      font-size: 12px;
      font-weight: 600;
      color: ${(props) => props.theme.grayColor};
    }
  }
`;

const Post = styled.li`
  border-bottom: 1px solid black;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
`;

export const TopBar = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  .top {
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 20px;
    padding: 20px;
    font-size: 15px;

    .logo {
      font-size: 18px;
    }
  }
  padding-bottom: 30px;
  margin-bottom: 30px;
`;

export const Search = styled.form`
  background-color: white;
  border-radius: 5px;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  display: flex;
  position: relative;
  input {
    padding: 15px;
    width: 100%;
    height: 100%;
    border: none;
  }
  button {
    background-color: transparent;
    border: none;
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
  }
`;

export const IconBar = FaBars;
export const IconSearch = IoMdSearch;

function Main() {
  const [boards, setBoards] = useState([]);
  //  axios.get 해서 isLoggedIn false 받았다고 가정
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onClickLogOut = () => {
    setIsLoggedIn((loggedin) => !loggedin);
  };

  // useEffect(() => {
  //   axios.get(SERVER_URL).then((response) => setBoards(response.data));
  // }, []);

  return (
    <>
      <TopBar>
        <div className="top">
          <span>
            <IconBar />
          </span>
          <span className="logo">서비스명</span>
          <span>
            <Link to="/login">로그인</Link>
          </span>
        </div>
        <Search>
          <input placeholder="검색어를 입력하세요" />
          <button>
            <IconSearch />
          </button>
        </Search>
      </TopBar>
      <ul>
        {sampleBoards.map((board, index) => {
          return (
            <Board key={index}>
              <Link to={`/${board.index}`}>
                <div className="title_row">
                  <span className="title">{board.name} ＞</span>
                  <span className="total_num">
                    {board.total_num}개의 이야기
                  </span>
                </div>
                <ul>
                  {board.posts.map((post, index) => (
                    <Post key={index}>
                      <span>{post.title}</span>
                      <span>댓글 수 : {post.comment_num}</span>
                    </Post>
                  ))}
                </ul>
              </Link>
            </Board>
          );
        })}
      </ul>
      <button onClick={onClickLogOut}>
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
    </>
  );
}

export default Main;
