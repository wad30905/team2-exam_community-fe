import axios from "axios";
import { useEffect } from "react";
import { getKakaoToken, sendKakaoTokenToServer } from "../../api";
import {
  KAKAO_REDIRECT_URI,
  KAKAO_REST_API_KEY,
} from "../molecules/KakaoLogin";
import Loading from "../molecules/Loading";

const OAuth = () => {
  // 발급된 인가코드를 백엔드로 넘겨주기 위해 꺼내오는 작업이 필요하다.
  // code라는 이름으로 파라미터 코드 값을 꺼내오려면 아래와 같이 선언하면 된다.
  let code = new URL(window.location.href).searchParams.get("code");

  const data: any = {
    grant_type: "authorization_code",
    client_id: KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    code: code,
  };

  useEffect(() => {
    // 꺼내온 code(인가코드)를 미들웨어를 통해 백엔드로 넘겨줘야함.
    const kakaologin = async () => {
      const token = await getKakaoToken(data);
      console.log("token :", token);
      const response = await sendKakaoTokenToServer(token.access_token);
      //   if ((response = "실패코드")) {
      //     window.location.href = "/";
      //   } else {
      //     window.location.href = "/login";
      //   }
    };
    kakaologin();
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

export default OAuth;
