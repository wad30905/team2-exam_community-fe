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
import { SERVER_URL } from "../../api";

function MyscrapPosts() {
  const [postsData, setPostsData] = useState<any | null>();

  // 데이터 받아와서
  // postData 에다가 setPostData
  useEffect(() => {
    axios({ method: "get", url: `${SERVER_URL}/mypost` }).then((response) => {
      setPostsData(response.data);
    });
  }, []);

  return (
    <>
      <TopBar needSearch={true} needWrite={true} />
      <BoardName>스크랩한 글</BoardName>
      <PostsList id={undefined} name={undefined} postsData={postsData} />
    </>
  );
}
export default MyscrapPosts;
