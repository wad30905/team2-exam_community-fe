import {
  Writer,
  Details,
  Content,
  ContentInfo,
  User,
  UserInfo,
  ContentBtn,
  ContentBtns,
  Content_Title,
  Content_Content,
} from "./atoms/styled";
import { samplePost } from "./atoms/sampleData";
import {
  IconLike,
  IconUser,
  IconCopy,
  IconCopied,
  IconLiked,
} from "./atoms/icons";
import { useState, useEffect } from "react";
import { IPostData } from "../pages/Post";
import Loading from "./Loading";
import { timeCalculator } from "../../api";

interface IPostProp {
  post?: any | null;
}

function PostMainContents({ post }: IPostProp) {
  const [likeClicked, setLikeClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);
  const [likeNum, setLikeNum] = useState();
  const [scrapNum, setScrapNum] = useState();

  const onLike = () => {
    setLikeClicked((current) => !current);
  };
  const onCopy = () => {
    setScrapClicked((current) => !current);
  };

  useEffect(() => {
    console.log("post :", post);
    if (post) {
      setLikeNum(post.like_num);
    }
  }, []);

  return (
    <>
      <User height="5vh">
        <IconUser className="userIcon" />
        <UserInfo>
          <Writer>{post?.user_id}</Writer>
          <Details>{timeCalculator(post?.c_date)}</Details>
        </UserInfo>
      </User>
      <Content>
        <Content_Title>{post?.title}</Content_Title>
        <Content_Content>{post?.content}</Content_Content>
      </Content>
      <ContentInfo>
        <ContentBtns>
          <ContentBtn onClick={onLike}>
            {likeClicked ? (
              <IconLiked className="icon" />
            ) : (
              <IconLike className="icon" />
            )}
            <span>좋아요</span>
          </ContentBtn>
          <ContentBtn onClick={onCopy}>
            {scrapClicked ? (
              <IconCopied className="icon" />
            ) : (
              <IconCopy className="icon" />
            )}
            <span>스크랩</span>
          </ContentBtn>
        </ContentBtns>
      </ContentInfo>
    </>
  );
}

export default PostMainContents;
