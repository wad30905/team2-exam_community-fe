import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { userState } from "../../store/atoms";

export const SERVER_URL = "http://192.168.187.137";

const sampleMain = [
  { index: 0, name: "자유게시판", posts: ["post1", "post2", "post3"] },
  { index: 1, name: "CPA게시판", posts: ["post1", "post2", "post3"] },
  { index: 2, name: "공무원시험게시판", posts: ["post1", "post2", "post3"] },
];

function Main() {
  const [boards, setBoards] = useState([]);
  const [user, setUser] = useRecoilState(userState);
  //  axios.get 해서 isLoggedIn false 받았다고 가정
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClickLogOut = () => {
    console.log("logOut Start");
    console.log("userstate : ", user);
  };

  useEffect(() => {
    axios.get(SERVER_URL).then((response) => setBoards(response.data));
  }, []);

  return (
    <>
      <ul>
        {sampleMain.map((board, index) => {
          return (
            <>
              <h1>{board.name}</h1>
              <ul>
                {board.posts.map((post, index) => (
                  <li>{post}</li>
                ))}
              </ul>
            </>
          );
        })}
      </ul>

      <button onClick={onClickLogOut}>
        {user.id === "" ? "로그인" : "로그아웃"}
      </button>
    </>
  );
}

export default Main;
