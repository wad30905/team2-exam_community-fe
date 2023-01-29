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
  const navigate = useNavigate();
  const [isMore, setIsMore] = useState(false);
  const [postsData, setPostsData] = useState<any | null>();
  const onBack = () => {
    navigate("/");
  };
  const onMore = () => {
    setIsMore((current) => !current);
  };
  useEffect(() => {
    axios({ method: "get", url: `${SERVER_URL}/mypost` }).then((response) => {
      setPostsData(response.data);
    });
  }, []);
  return (
    <>
      <TopBarContainer>
        <TopContainer>
          <TopBarMenu onClick={onBack}>
            <IconBackBtn />
          </TopBarMenu>
          <TopBarMain>
            <Link to="/">코코볼</Link>
          </TopBarMain>
          <TopBarBtns>
            <IconBar />
          </TopBarBtns>
        </TopContainer>
        <SearchBar placeholder={"검색하시오."} />
      </TopBarContainer>
      <BoardName>내가 쓴 글</BoardName>
      <PostsList id={undefined} name={undefined} postsData={postsData} />
    </>
  );
}
export default MyPosts;
