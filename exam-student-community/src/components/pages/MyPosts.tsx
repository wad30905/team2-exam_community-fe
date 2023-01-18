import TopBar from "../molecules/TopBar";
import PostsList from "../molecules/PostsList";
import { IconBackBtn, IconBar, IconMoreBtn } from "../molecules/atoms/icons";
import {
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
    axios({ method: "get" }).then((response) => {
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
            <Link to="/">{"내가 쓴 글"}</Link>
          </TopBarMain>
          <TopBarBtns>
            <IconBar />
          </TopBarBtns>
        </TopContainer>
        <SearchBar placeholder={"검색하시오."} />
      </TopBarContainer>
      <PostsList id={undefined} name={undefined} postsData={postsData} />
    </>
  );
}
export default MyPosts;
