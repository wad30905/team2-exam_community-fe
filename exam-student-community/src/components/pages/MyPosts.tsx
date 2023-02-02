import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import { IconBackBtn, IconBar, IconMoreBtn } from "../molecules/atoms/icons";
import {
  BoardName,
  TopBarBtns,
  TopBarContainer,
  TopBarMain,
  TopBarMenu,
  TopContainer,
} from "../molecules/atoms/styled";
import { Link } from "react-router-dom";
import SearchBar from "../molecules/SearchBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../api";
// import { getMyPost } from "../../api";

function MyPosts() {
  const [postsData, setPostsData] = useState<any | null>();
  useEffect(() => {
    axios({ method: "get", url: `${SERVER_URL}/mypost` }).then((response) => {
      setPostsData(response.data);
    });
  }, []);
  return (
    <>
      <TopBar needSearch={true} needWrite={true} />
      <BoardName>내가 쓴 글</BoardName>
      <PostsList id={undefined} name={undefined} postsData={postsData} />
    </>
  );
}
export default MyPosts;
