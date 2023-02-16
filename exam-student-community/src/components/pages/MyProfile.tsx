import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "../../api";
import {
  Age,
  Bio,
  Email,
  Gender,
  Name,
  ProfileContainer,
  ProfileInfo,
  ProfilePhoto,
  SmallButton,
  Wrapper,
} from "../molecules/atoms/styled";
import TopBar from "../molecules/TopBar";

const profileImgUrl =
  "https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png";

interface IUserData {
  age: string;
  c_date: string;
  d_date: null;
  email: string;
  gender: string;
  id: number;
  m_date: string;
  name: string;
  phone: null;
  user_id: string;
  user_pw: string;
}

function MyProfile() {
  const [userData, setUserData] = useState<IUserData>();

  useEffect(() => {
    const getUserData = async () => {
      const response = await getProfile();
      console.log("response :", response);
      setUserData((prevState) => {
        return { ...prevState, ...response };
      });
    };
    getUserData();
  }, []);

  return (
    <>
      <TopBar needWrite={true} needSearch={true} />
      <ProfileContainer>
        <ProfileInfo>
          <ProfilePhoto src={profileImgUrl} alt="Profile" />
          <Name>{userData?.name}</Name>
          <Age>공부기간 : {userData?.age}</Age>
          <Gender>성별 : {userData?.gender === "m" ? "남자" : "여자"}</Gender>
          <Email>이메일 : {userData?.email}</Email>
        </ProfileInfo>
        <SmallButton>
          <Link to="/fixmyprofile">프로필 수정하기</Link>
        </SmallButton>
      </ProfileContainer>
    </>
  );
}
export default MyProfile;
