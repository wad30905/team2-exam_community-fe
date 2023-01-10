import { useEffect } from "react";
import axios from "axios";

export const SERVER_URL = "http://192.168.187.137";

// login check
export function AuthChecker(): any {
  // 사용자인지 체크하는 함수
  // 사용자가 맞으면 true / 아니면 false를 반환함.
  // 로그인 된 상태인지 아닌지랑 동치?
  // 지금 return이 if else에만 걸려있어서 typescript 에러뜸. any로 박아놨는데 해결필요.
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/check-auth", {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        console.log("User is authenticated");
        return true;
      } else {
        console.log("User is not authenticated");
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };
}
