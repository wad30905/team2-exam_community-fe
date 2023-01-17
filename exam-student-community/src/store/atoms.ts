import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const user = atom({
  key: "user",
  default: { userName: "hongjin" },
  effects_UNSTABLE: [persistAtom],
});

// kuk329 : 회원가입 관련
export const registerName = atom({
  // username
  key: "username",
  default: "",
});

export const registerId = atom({
  // userId
  key: "userId",
  default: "",
});
export const registerPd = atom({
  // password
  key: "password",
  default: "",
});
export const registerPhone = atom({
  // phone
  key: "phone",
  default: "",
});
export const registerEmail = atom({
  // email
  key: "email",
  default: "",
});
export const registerGender = atom({
  // gender
  key: "gender",
  default: "",
});

export const registerTime = atom({
  // time
  key: "time",
  default: "",
});
