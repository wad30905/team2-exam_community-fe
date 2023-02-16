import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, SERVER_URL } from "../../api";
import { LoginForm } from "../molecules/atoms/styled";

interface IForm {
  password1: string;
  password2: string;
}

function ResetPassword() {
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const navigate = useNavigate();

  async function onSubmit(data: IForm) {
    if (data.password1 !== data.password2) {
      setError("password2", { message: "비밀번호가 다릅니다." });
      return false;
    }
    // const resetPw = async () => {
    //   const response = resetPassword(data.password1, token);
    //   console.log("response :", response);
    // };
    // resetPw();
    try {
      const response = await resetPassword(data.password1, token);
      if (response.status === 200) {
        alert("변경성공");
        navigate("/login");
      } else {
        alert("변경실패");
      }
    } catch (error) {
      console.log("catch error :", error);
    }
  }

  return (
    <>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <label>새로운 비밀번호를 입력해주세요</label>
        <input
          {...register("password1", {
            required: "새로운 비밀번호를 입력해주세요",
          })}
          type="password"
          name="password1"
        />
        <span className="errorMessage">{errors?.password1?.message}</span>
        <br />
        <label>비밀번호 확인</label>
        <input
          {...register("password2", {
            required: "비밀번호를 한번 더 입력해주세요",
          })}
          type="password"
          name="password2"
        />
        <span className="errorMessage">{errors?.password2?.message}</span>
        <button>비밀번호 변경</button>
      </LoginForm>
    </>
  );
}

export default ResetPassword;
