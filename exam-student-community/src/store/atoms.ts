import { atom, selector } from "recoil";

interface IuserState {
  id: string;
  password: string;
}

export const userState = atom<IuserState>({
  key: "user",
  default: {
    id: "",
    password: "",
  },
});
