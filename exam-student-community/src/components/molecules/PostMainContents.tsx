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
  PostMainContentsWrapper,
  PostMoreBtn,
  UpdateDeleteBox,
} from "./atoms/styled";
import { samplePost } from "./atoms/sampleData";
import {
  IconLike,
  IconUser,
  IconCopy,
  IconCopied,
  IconLiked,
  IconMoreBtn,
} from "./atoms/icons";
import { useState, useEffect } from "react";
import { IPostData } from "../pages/Post";
import Loading from "./Loading";
import { timeCalculator } from "../../api";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, postOptionState, userId } from "../../store/atoms";
import { replaceUrlsWithHyperlinks } from "../../functions";

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
  const loginCheck = useRecoilValue(loginState); 

  const [isOptions, setIsOptions] = useRecoilState(postOptionState);
  const onOptions = () => {
    setIsOptions((current) => !current);
  };

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
    <PostMainContentsWrapper>
      <User height="5vh">
        <IconUser className="userIcon" />
        <UserInfo>
          <Writer>{post?.user_name}</Writer>
          <Details>{timeCalculator(post?.c_date)}</Details>
        </UserInfo>
        {loginCheck && post.user_id == loginUserId && (
          <UpdateDeleteBox>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </UpdateDeleteBox>
        )}
        <PostMoreBtn>
          <IconMoreBtn onClick={onOptions} />
        </PostMoreBtn>
      </User>
      <Content>
        <Content_Title dangerouslySetInnerHTML={{ __html: replaceUrlsWithHyperlinks(post?.title) }} ></Content_Title>
        <Content_Content dangerouslySetInnerHTML={{ __html: replaceUrlsWithHyperlinks(post?.content) }} ></Content_Content>
      </Content>
      <ContentInfo>
        <ContentBtns>
          <ContentBtn onClick={onLike}>
            {likeClicked ? (
              <IconLiked className="icon" style={{ color: "red" }} />
            ) : (
              <IconLike className="icon" />
            )}
            <span>좋아요</span>
          </ContentBtn>
          <ContentBtn onClick={onCopy}>
            {scrapClicked ? (
              <IconCopied className="icon" style={{ color: "green" }} />
            ) : (
              <IconCopy className="icon" />
            )}
            <span>스크랩</span>
          </ContentBtn>
        </ContentBtns>
      </ContentInfo>
    </PostMainContentsWrapper>
  );
}

export default PostMainContents;
