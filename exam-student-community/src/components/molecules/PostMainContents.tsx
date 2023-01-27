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
import { useRecoilValue } from "recoil";
import { userId } from "../../store/atoms";

interface IPostProp {
  post?: any | null;
  handleDelete: any;
  handleEdit: any;
}

function PostMainContents({ post, handleDelete, handleEdit }: IPostProp) {
  const [likeClicked, setLikeClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);
  const [likeNum, setLikeNum] = useState();
  const [scrapNum, setScrapNum] = useState();
  const loginUserId = useRecoilValue(userId);

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
        {post.user_id == loginUserId && (
          <div style={{ position: "absolute", right: 0 }}>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
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
