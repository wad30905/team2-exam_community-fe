import { useEffect } from "react";
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
import { useState } from "react";
import axios from "axios";
import Dropdown from "../molecules/Dropdown";
// import { getMyComments } from "../../api";

function MycommentPosts() {
  const [isMore, setIsMore] = useState(false);
  const [commentsData, setCommentsData] = useState<any | null>();
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/");
  };
  const onMore = () => {
    setIsMore((current) => !current);
    console.log("onMore");
  };
  useEffect(() => {
    // const paintMyComments = async () => {
    //   const myComments = await getMyComments();
    //   setCommentsData(myComments);
    //   console.log(myComments);
    // };
    // paintMyComments();
  }, []);
  console.log("ismore", isMore);
  return (
    <>
      <TopBarContainer>
        <TopContainer>
          <TopBarMenu onClick={onBack}>
            <IconBackBtn />
          </TopBarMenu>
          <TopBarMain>
            <Link to="/">{"댓글단 글"}</Link>
          </TopBarMain>
          <TopBarBtns>
            <IconBar onClick={onMore} />
          </TopBarBtns>
        </TopContainer>
        <SearchBar placeholder={"검색하시오."} />
        {isMore ? <Dropdown /> : null}
      </TopBarContainer>
      <ul>
        {commentsData?.map((comment: any, index: any) => (
          <li key={index}>{comment.content}</li>
        ))}
      </ul>
    </>
  );
}
export default MycommentPosts;
