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
    padding: 20px;
    justify-content: space-around;
    font-weight: 600;
    color: ${(props) => props.theme.grayColor};
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

export const Bar = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  .top {
    color: white;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 20px;
    padding: 20px;
    font-size: 15px;
    .logo {
      font-size: 18px;
    }
  }
  span {
    cursor: pointer;
  }
  padding-bottom: 30px;
  margin-bottom: 30px;
`;

export const Search = styled.form`
  background-color: white;
  border-radius: 5px;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  display: flex;
  position: relative;
  input {
    padding: 15px;
    width: 100%;
    height: 100%;
    border: none;
  }
  button {
    background-color: transparent;
    border: none;
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
  }
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
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 10px ${(props) => props.theme.accentColor};
    transform: translateY(-2px);
    color: ${(props) => props.theme.accentColor};
  }
`;

export const DropdownBox = styled.div`
  transition: all 1s ease-in-out;
  padding: 20px 50px;
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
