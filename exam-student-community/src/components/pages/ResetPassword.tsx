import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../../api";
import { LoginForm } from "../molecules/atoms/styled";

interface IForm {
  password1: string;
  password2: string;
}

function ResetPassword() {
  const token = useParams();
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

    try {
      const response = await axios({
        method: "post",
        url: `${SERVER_URL}/api/login`,
        data: {
          password: data.password1,
          token: token,
        },
      });
      if (response.status == 201 || response.status == 202) {
        alert("비밀번호 변경 성공");
        navigate("/login");
      } else {
        alert("비밀번호 변경에 실패했습니다. 잠시후 시도해주세요.");
        navigate("/");
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
