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
import { BlogSampleData } from "./atoms/sampleData";
import {
  IconLike,
  IconUser,
  IconCopy,
  IconCopied,
  IconLiked,
} from "./atoms/icons";
import { useState } from "react";

function BlogMainContents() {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const onLike = () => {
    setLiked((current) => !current);
  };
  const onCopy = () => {
    setCopied((current) => !current);
  };
  return (
    <>
      <User height="5vh">
        <IconUser style={{ width: "10%", height: "95%", margin: "0" }} />
        <UserInfo>
          <Writer>{BlogSampleData.writer}</Writer>
          <Details>{BlogSampleData.time}</Details>
        </UserInfo>
      </User>
      <Content>
        <Title>{BlogSampleData.title}</Title>
        <p>{BlogSampleData.content}</p>
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
  );
}

export default BlogMainContents;
