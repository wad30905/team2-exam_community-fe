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
import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "../molecules/Dropdown";
import { getMyLikePosts, SERVER_URL } from "../../api";
import Loading from "../molecules/Loading";
import { IPost } from "./Post";

function MyLikePosts() {
  const [postsData, setPostsData] = useState<IPost[]>();

  // 데이터 받아와서
  // postData 에다가 setPostData
  useEffect(() => {
    const fetchMyLikePosts = async () => {
      const data = await getMyLikePosts();
    }
    fetchMyLikePosts();
  }, []);

  return (
    <>
      <TopBar needSearch={true} needWrite={true} />
      <BoardName>좋아요한 글</BoardName>

      {!postsData ? <Loading/> : <PostsList id={undefined} name={undefined} postsData={postsData} />}
    </>
  );
}
export default MyLikePosts;
