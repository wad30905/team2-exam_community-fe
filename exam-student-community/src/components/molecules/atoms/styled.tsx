import styled from "styled-components";

export const LoginForm = styled.form`
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;

  label {
    display: inline-block;
    margin-bottom: 10px;
    margin-top: 20px;
  }

  input[type="id"],
  input[type="password"] {
    width: 100%;
    padding: 12px 20px;

    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.grayColor};
    border-radius: 4px;
  }

  button {
    margin-top: 20px;
    display: block;
    width: 100%;
    height: 60px;
    background-color: ${(props) => props.theme.whiteColor};
    color: ${(props) => props.theme.accentColor};
    /* padding: 14px 20px; */
    font-size: 20px;
    font-weight: 600;
    border: 1px solid ${(props) => props.theme.accentColor};
    border-radius: 15px;
    cursor: pointer;
  }

  button:hover {
    background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.whiteColor};
  }

  .errorMessage {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 20px;
    color: red;
    font-size: 15px;
    font-weight: 600;
  }

  .signUpBox {
    display: flex;
    padding: 20px 10px;
    justify-content: space-around;
    gap: 10px;
    font-weight: 600;
    color: ${(props) => props.theme.grayColor};
    font-size: 13px;
  }
`;

export const Board = styled.div`
  width: 100%;
  box-shadow: 0px 0px 10px ${(props) => props.theme.grayColor};
  font-size: 20px;
  padding: 20px 0px;
  margin-bottom: 20px;
  .title_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    margin-bottom: 20px;
    .title {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .total_num {
      font-size: 12px;
      font-weight: 600;
      color: ${(props) => props.theme.grayColor};
    }
  }
`;

export const BoardPost = styled.li`
  border-bottom: 1px solid black;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
`;

export const SearchContainer = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8vh;
`;
export interface SearchProps {
  placeholder: string;
}
export const Search = styled.input`
  width: 90%;
  height: 4vh;
  placeholder: ${(props) => props.placeholder};
  background-image: url(./images/SearchIcon.png);
  background-repeat: no-repeat;
  background-size: 13px;
  background-position: 98%;
  padding: 10px;
  border-radius: 5px;
  border: none;
`;

export const Post = styled.li`
  display: flex;
  border-bottom: 1px solid black;
  align-items: center;
  padding: 15px 10px;
  font-weight: 600;
  .comment_num {
    padding: 10px;
    font-size: 25px;
    color: ${(props) => props.theme.accentColor};
  }
  .box__title_meta {
    display: flex;
    flex-direction: column;
    gap: 7px;
    .title {
      font-size: 23px;
    }
    .meta {
      font-size: 13px;
      color: ${(props) => props.theme.grayColor};
      display: flex;
      gap: 5px;
    }
  }
`;

export const Menu = styled.li`
  width: 95%;
  box-shadow: 0px 0px 10px ${(props) => props.theme.grayColor};
  border: none;
  border-radius: 10px;
  padding: 15px;
  margin: 20px auto;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px ${(props) => props.theme.accentColor};
    transform: translateY(-2px);
    color: ${(props) => props.theme.accentColor};
  }
`;

export const DropdownBox = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
  opacity: 0;
  transition: opacity 0.5s ease;
  ul {
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    padding-left: 3%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-height: 100vh;
  transform: translateY(-50px);
  span {
    font-size: 30px;
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
  }
  img {
    width: 100px;
    height: 100px;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  margin-top: 5px;
  margin-bottom: 20px;
  color: red;
  font-size: 15px;
  font-weight: 600;
  width: 90%;
  padding: 20px;
`;

export const TopBarMenu = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.whiteColor};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 20%;
`;

export const TopBarMain = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.whiteColor};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  cursor: pointer;
  width: 60%;
`;

export const TopBarBtns = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.whiteColor};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  a {
    cursor: pointer;
    padding: 5px;
    font-size: 0.0001em;
  }
`;

export const TopContainer = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7vh;
  padding: 5%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 5px;

  h1 {
    font-size: 20px;
  }

  button {
    background-color: #fff;
    border: none;
    cursor: pointer;
    font-size: 15px;
  }
`;

export const GenderCheckBtn = styled.button`
  color: black;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: none;
  &:hover {
    background-color: #5928e5;
    color: white;
  }
  &.on {
    background-color: #5928e5;
    color: white;
  }
`;

export const FormBox = styled.div`
  margin: 0 auto;
  width: 80%;
`;

export const RegisterButton = styled.button`
  background-color: gray;
  color: white;
  border: none;
  /* width: 100%; */
  width: 100%;
  font-size: 20px;
  padding: 5px;
  &:hover {
    background-color: #5928e5;
  }
  margin: 0 auto;
`;

export const InputBox = styled.div`
  padding: 10px;

  input {
    margin-top: 10px;
    width: 100%;
    padding: 7px;

    &:focus {
      border-color: #5928e5;
      outline: none;
    }
  }
  label {
    color: gray;
    font-weight: 700;
  }
`;

export const BlogInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 7vh;
  width: 100%;
  margin: 10px auto;
`;

export const ProfilePic = styled.div`
  height: 6vh;
  width: 6vh;
  background: blue;
  margin-right: 10px;
`;
export const Blog = styled.li`
  a {
    background-color: white;
    color: black;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-around;
    padding: 5px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
export const BlogTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
`;

export interface UserProps {
  height: string;
}

export const User = styled.div<UserProps>`
  display: flex;
  justify-content: start;
  align-items: center;
  height: ${(props) => props.height};
  width: 100%;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Writer = styled.h3`
  font-size: 20px;
`;

export const Details = styled.p`
  font-size: 10px;
  color: #aaa;
`;

export const MainContents = styled.div`
  min-height: 30vh;
  padding: 5%;
  width: 100%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid #aaa;
`;

export const Title = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
`;

export const Content = styled.div`
  padding: 20px 10px;
  p {
    font-size: 15px;
    background: white;
  }
`;
export const ContentInfo = styled.p`
  font-weight: lighter;
  font-size: 10px;
  color: #aaa;
`;

export const ContentButtons = styled.div``;
export const ContentBtns = styled.div`
  margin-top: 10px;
  height: 5vh;
  display: flex;
  justify-content: start;
`;

export const LikeBtn = styled.div`
  width: 6vh;
  background: green;
`;
export const ContentBtn = styled.div`
  display: flex;
  width: 15%;
  height: 100%;
  color: black;
  align-items: center;
  span {
    width: 50%;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const CommentBtn = styled.div`
  width: 6vh;
  background: purple;
`;

export const CommentsList = styled.ul`
  margin: 10px 0;
  list-style: none;
`;

export const Comment = styled.li`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #aaa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CommenterBox = styled.div`
  display: flex;
  justify-content: start;
  height: 3vh;
  align-items: center;
`;

export const CommenterName = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

export const CommentContent = styled.div`
  margin-top: 5px;
  p {
    margin-left: 10px;
    font-size: 15px;
  }
`;

export const CommentForm = styled.form`
  position: relative;
  button {
    position: absolute;
    top: 3px;
    right: 10px;
  }
`;

export const CommentInput = styled.input`
  display: block;

  border: 1px solid black;
  border-radius: 20px;
  padding: 20px;
  resize: none;
  width: 100%;
  height: 50px;
`;
export const CommentInputBox = styled.div`
  padding: 20px 10px;
`;

export const CommentButton = styled.button`
  height: 100%;
  width: 10%;
  font-size: 30px;
  color: ${(props) => props.theme.accentColor};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
export const BlogMain = styled.div`
  height: 90vh;
  overflow: scroll;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: spac-between;
`;

export const BoardsList = styled.ul`
  height: 85vh;
  overflow: scroll;
  padding: 10px;
`;

export const BlogsContainer = styled.ul`
  list-style: none;
  height: 85vh;
  overflow: scroll;
`;

export const WriteSelectorContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 10%;
  width: 100%;
`;
export const WriteSelector = styled.select`
  display: block;
  width: 60%;
  height: 60%;
  border-radius: 5px;
  border: 1px solid #aaa;
`;

export const WriteContents = styled.form`
  height: 93vh;
`;

export const TitleInput = styled.input`
  padding: 10px 20px;
  display: block;
  height: 10%;
  width: 100%;
  font-size: 25px;
  border: none;
  border-bottom: 1px solid #aaa;
  &:focus {
    outline: none;
  }
`;

export const ContentInput = styled.textarea`
  padding: 20px;
  font-size: 18px;
  display: block;
  width: 100%;
  height: 60%;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;
export const WriteSubmitContainer = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
`;
export const Submit = styled.button`
  background: ${(props) => props.theme.accentColor};
  color: white;
  height: 60%;
  width: 80%;
  border: none;
  font-size: 30px;
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
`;
