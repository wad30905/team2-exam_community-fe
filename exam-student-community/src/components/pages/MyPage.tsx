import { useState, useEffect } from "react";
import { updateProfile, getProfile } from "../../api";
import { useForm } from "react-hook-form";
import { LoginForm } from "../molecules/atoms/styled";
import TopBar from "../molecules/TopBar";
import Loading from "../molecules/Loading";

interface IForm {
  age: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [skipCount, setSkipCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [userData, setUserData] = useState({
    age: "0",
    name: "default",
    email: "default",
    phone: "default",
    gender: "default",
  });

  function onSubmit(data: IForm) {
    setUserData((state) => ({
      age: data.age,
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
    }));
  }

  useEffect(() => {
    if (skipCount === 0) {
      const getUserInfo = async () => {
        const userProfile = await getProfile();
        setUserData({
          age: userProfile.age?.toString(),
          name: userProfile.name,
          email: userProfile.email,
          phone: userProfile.phone,
          gender: userProfile.gender,
        });
        setSkipCount(1);
        setisLoading(false);
        console.log("useEffect 1 userData :", userData);
      };
      getUserInfo();
    } else if (skipCount === 1) {
      setSkipCount(2);
    } else {
      updateProfile(userData);
      alert("수정성공");
      window.location.href = "/";
    }
  }, [userData]);

  return !isLoading ? (
    <>
      <TopBar
        id={undefined}
        mainService={"코코볼"}
        needWrite={false}
        needSearch={false}
      />
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <label>나이</label>
        <input
          {...register("age", {
            required: "나이를 입력해주세요",
          })}
          name="age"
          type="age"
          defaultValue={`${userData.age}`}
        />
        <span className="errorMessage">{errors?.age?.message}</span>

        <br />
        <label>이름</label>
        <input
          {...register("name", {
            required: "이름을 입력해주세요",
          })}
          type="name"
          name="name"
          defaultValue={`${userData.name}`}
        />
        <span className="errorMessage">{errors?.name?.message}</span>
        <br />
        <label>이메일</label>
        <input
          {...register("email", {
            required: "이메일을 입력해주세요",
          })}
          type="text"
          name="email"
          defaultValue={`${userData.email}`}
        />
        <span className="errorMessage">{errors?.email?.message}</span>
        <br />
        <label>전화번호</label>
        <input
          {...register("phone", {
            required: "전화번호를 입력해주세요",
          })}
          type="text"
          name="phone"
          defaultValue={`${userData.phone}`}
        />
        <span className="errorMessage">{errors?.phone?.message}</span>
        <br />
        <label>성별</label>
        <input
          {...register("gender", {
            required: "성별을 입력해주세요",
          })}
          type="text"
          name="gender"
          defaultValue={`${userData.gender}`}
        />
        <span className="errorMessage">{errors?.gender?.message}</span>
        <br />
        <button type="submit">수정하기</button>
      </LoginForm>
    </>
  ) : (
    <Loading />
  );
}

export default MyPage;
