import { KakaoLoginButton } from "./atoms/styled";

export const KAKAO_REST_API_KEY = "1c931367a33a28514caf8b8f108e73c4";
export const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const KakaoLogin = () => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <KakaoLoginButton onClick={kakaoLogin} src="../../assets/button.png" />
    </>
  );
};

export default KakaoLogin;
