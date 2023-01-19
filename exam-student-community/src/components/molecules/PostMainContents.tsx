import {
  Writer,
  Details,
  Title,
  Content,
  ContentInfo,
  User,
  UserInfo,
  ContentBtn,
  ContentBtns,
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
        <IconUser style={{ width: "10%", height: "95%", margin: "0" }} />
        <UserInfo>
          <Writer>{post?.user_id}</Writer>
          <Details>{timeCalculator(post?.c_date)}</Details>
        </UserInfo>
      </User>
      <Content>
        <Title>{post?.title}</Title>
        <p>{post?.content}</p>
      </Content>
      <ContentInfo>
        <ContentBtns>
          <ContentBtn onClick={onLike}>
            {likeClicked ? (
              <IconLiked
                style={{ width: "50%", height: "100%", cursor: "pointer" }}
              />
            ) : (
              <IconLike
                style={{ width: "50%", height: "100%", cursor: "pointer" }}
              />
            )}
            <span>좋아요 {likeNum}</span>
          </ContentBtn>
          <ContentBtn onClick={onCopy}>
            {scrapClicked ? (
              <IconCopied
                style={{ width: "50%", height: "100%", cursor: "pointer" }}
              />
            ) : (
              <IconCopy
                style={{ width: "50%", height: "100%", cursor: "pointer" }}
              />
            )}
            <span>스크랩</span>
          </ContentBtn>
        </ContentBtns>
      </ContentInfo>
    </>
  );
}

export default PostMainContents;
