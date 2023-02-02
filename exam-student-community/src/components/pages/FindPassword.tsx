import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { checkId, SERVER_URL } from "../../api";
import { LoginForm } from "../molecules/atoms/styled";
import Loading from "../molecules/Loading";

interface IForm {
  id: string;
  email: string;
}

function FindPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [emailLoading, setEmailLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(data: IForm) {
    try {
      // 존재하는 아이디인지 확인
      const response1 = await axios({
        method: "post",
        url: `${SERVER_URL}/id_compare`,
        data: {
          user_id: data.id,
        },
      });
      console.log("response1 :", response1);
      if (response1.data.boo) {
        // 없는 아이디다.
        alert("없는 아이디입니다. 다시 확인 ㄱㄱ");
        return false;
      }

      // 아이디랑 이메일 값 서버로 post
      const response2 = await axios({
        method: "post",
        url: `${SERVER_URL}/email`,
        data: {
          user_id: data.id,
          user_email: data.email,
        },
      });
      console.log("response2 : ", response2);
      setEmailLoading(true);
    } catch (error) {
      console.log("catch error :", error);
    }
  }

  return emailLoading ? (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <label>이메일을 확인해주세요</label>
      <label>이메일이 오지 않는다면?</label>
    </LoginForm>
  ) : (
    <>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <label>비밀번호를 찾을 아이디를 입력해주세요</label>
        <input
          {...register("id", {
            required: "아이디를 입력해주세요",
          })}
          name="id"
          type="id"
        />
        <span className="errorMessage">{errors?.id?.message}</span>
        <br />
        <label>본인 명의의 이메일을 입력해주세요.</label>
        <input
          {...register("email", {
            required: "이메일을 입력해주세요",
          })}
          type="email"
          name="email"
        />
        <span className="errorMessage">{errors?.email?.message}</span>
        <button>이메일 전송</button>
      </LoginForm>
    </>
  );
}

export default FindPassword;
