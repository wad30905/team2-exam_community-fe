import { useState } from "react";
import { Link } from "react-router-dom";
import { Board, BoardPost, BoardsList } from "./atoms/styled";
import { IconComment, IconRarr } from "./atoms/icons";
import { sampleBoards } from "./atoms/sampleData";

export interface IPost {
  id: Number;
  title: String;
  comment_num: Number;
  click_num: Number;
  writer: String;
  m_date: Number;
  d_date: Number;
}

export interface IBoard {
  index: Number;
  name: String;
  total_num: Number;
  posts: IPost[];
}

interface IBoards {
  data: IBoard[] | undefined;
}

function Boards({ data }: any) {
  return (
    <BoardsList>
      {data?.map((board: any, index: number) => {
        return (
          <Board key={index}>
            <Link
              to="blogs"
              state={{ blogsId: index + 1, blogsName: `${index + 1}번 게시판` }}
            >
              <div className="title_row">
                <span className="title">
                  {index + 1}번 게시판 <IconRarr />
                </span>
                <span className="total_num">{board[1]}개의 이야기</span>
              </div>
              <ul>
                {board[0].map((post: any, index: number) => (
                  <BoardPost key={index}>
                    <span>{post.title}</span>
                    <span>
                      <IconComment /> {`${post.comment_num}`}
                    </span>
                  </BoardPost>
                ))}
              </ul>
            </Link>
          </Board>
        );
      })}
    </BoardsList>
  );
}

export default Boards;
