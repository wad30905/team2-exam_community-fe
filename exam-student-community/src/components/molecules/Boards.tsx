import { useState } from "react";
import { Link } from "react-router-dom";
import { Board, BoardPost, BoardsList } from "./atoms/styled";
import { IconComment, IconRarr } from "./atoms/icons";
import { sampleBoards } from "./atoms/sampleData";
import { IBoards } from "../pages/Main";

interface IBoards_ {
  data : IBoards[] | undefined
}

function Boards({data} :  IBoards_) {
return (
  <BoardsList>
    {data && data?.map((board, index) => {
      return (
      <Board key={index}>
        <Link to={`/blogs`} state={{blogsId: index, blogsName: board.name}}>
          <div className="title_row">
            <span className="title">
              {board.name} <IconRarr />
            </span>
            <span className="total_num">{`${board.total_num}개의 이야기`}</span>
          </div>
          <ul>
            {board.posts.map((post, index) => (
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
)};

export default Boards;
