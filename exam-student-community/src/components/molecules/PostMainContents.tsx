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
import { useState } from "react";
import { IPostData } from "../pages/Post";
import Loading from "./Loading";
import { 게시물시간구하기 } from "../../api";

interface IPostProp {
  post?: IPostData | null;
}

function PostMainContents({ post }: IPostProp) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const onLike = () => {
    setLiked((current) => !current);
  };
  const onCopy = () => {
    setCopied((current) => !current);
  };

  return post ? (
    <>
      <User height="5vh">
        <IconUser style={{ width: "10%", height: "95%", margin: "0" }} />
        <UserInfo>
          <Writer>{post.user_name}</Writer>
          <Details>{게시물시간구하기(post.c_date)}</Details>
        </UserInfo>
      </User>
      <Content>
        <Title>{post.title}</Title>
        <p>{post.content}</p>
      </Content>
      <ContentInfo>
        <ContentBtns>
          <ContentBtn onClick={onLike}>
            {liked ? (
              <IconLiked
                style={{ width: "50%", height: "100%", cursor: "pointer" }}
              />
            ) : (
              <IconLike
                style={{ width: "50%", height: "100%", cursor: "pointer" }}
              />
            )}
            <span>좋아요</span>
          </ContentBtn>
          <ContentBtn onClick={onCopy}>
            {copied ? (
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
  ) : (
    <Loading />
  );
}

export default PostMainContents;
