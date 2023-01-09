import { useParams } from "react-router-dom";
import { sampleBoards } from "./Main";
import { TopBar, Search, IconBar, IconSearch } from "./Main";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Post = styled.li`
  display: flex;
  border-bottom: 1px solid black;
  align-items: center;
  padding: 15px 10px;
  font-weight: 600;
  .comment_num {
    padding: 10px;
    font-size: 25px;
    color: ${(props) => props.theme.accentColor};
  }
  .box__title_meta {
    display: flex;
    flex-direction: column;
    gap: 7px;
    .title {
      font-size: 23px;
    }
    .meta {
      font-size: 13px;
      color: ${(props) => props.theme.grayColor};
      display: flex;
      gap: 5px;
    }
  }
`;

function Posts() {
  const { boardIndex } = useParams();
  const board = sampleBoards[boardIndex as any];
  const posts = sampleBoards[boardIndex as any].posts;

  return (
    <>
      <TopBar>
        <div className="top">
          <span>
            <IconBar />
          </span>
          <span className="logo">{board.name}</span>
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
        {posts.map((post, index) => (
          <Link to={`./${post.id}`} key={index}>
            <Post>
              <span className="comment_num">{post.comment_num}</span>
              <div className="box__title_meta">
                <span className="title">{post.title}</span>
                <div className="meta">
                  <span>18분전</span>
                  <span>조회 120</span>
                  <span>손채환</span>
                  <span>질문</span>
                </div>
              </div>
            </Post>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default Posts;
