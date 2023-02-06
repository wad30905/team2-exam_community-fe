import { useState } from "react";
import { Link } from "react-router-dom";
import { Board, BoardPost, BoardsList } from "./atoms/styled";
import { IconComment, IconRarr } from "./atoms/icons";
import { PostsObject, sampleBoards } from "./atoms/sampleData";
import { stringify } from "querystring";

function Boards({ data }: any) {
  return (
    <BoardsList>
      {data?.map((board: any, index: number) => {
        return (
          <Board key={index}>
            <Link
              to="posts"
              state={{
                boardId: index + 1,
                boardName: `${PostsObject[String(index + 1)]}`,
              }}
            >
              <div className="title_row">
                <span className="title">
                  {PostsObject[String(index + 1)]} <IconRarr />
                </span>
                <span className="total_num">{board[1]}개의 이야기</span>
              </div>
              <ul>
                {board[0].map((post: any, index: number) => (
                  <BoardPost key={index}>
                    {post.title.length <= 20 ? (
                      <span>{post.title}</span>
                    ) : (
                      <span>{post.title.slice(0, 20) + "..."}</span>
                    )}
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
