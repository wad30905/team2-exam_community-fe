import { LoadingBox } from "./atoms/styled";

function Loading() {
  return (
    <LoadingBox>
      <img src="https://blog.kakaocdn.net/dn/c3Rwqs/btqVugu1Dvv/SWkENtL39bcQ7fTrWNBxu0/img.gif" />
      <span>로딩중</span>
    </LoadingBox>
  );
}

export default Loading;
