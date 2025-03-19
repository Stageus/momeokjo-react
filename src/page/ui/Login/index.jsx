import { useNavigate } from "react-router-dom"
import s from "./style"
import Button from "../../../widget/ui/Button"
import BackIcon from "./assets/ico-back.svg"
import kakaoIcon from "../../../widget/assets/ico-kakao.svg"
import useLoginData from "./model/useLoginData"

const Login = () => {

  const navigate = useNavigate()
  const {inputFields, handleSubmit, refs} = useLoginData()

  return (
    <s.Container>
      <s.Header>
        <s.Back onClick={() => navigate("/")}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼"/>
        </s.Back>
        <s.Title>로그인</s.Title>
        <s.Empty></s.Empty>
      </s.Header>
      
      <s.Form>
        {inputFields .map((field, index) => (
          <s.InputBox key={index}>
          <s.Label>
            {field.label} <s.Span>*</s.Span>
          </s.Label>
          <s.Input 
            type={field.type}
            ref={refs[field.refName]}
            $error={!!field.error}
            placeholder={field.placeholder}
          />
          {!!field.error &&
            <s.Message $error={!!field.error}>
              {field.label === "아이디" && "50자 이하 / 영어, 숫자 조합"}
              {field.label === "비밀번호" && "8~32자 이하, 영대문자 1자 이상, 특수문자 1자 이상, 영소문자, 숫자 조합"}
            </s.Message>
          }
        </s.InputBox>
        ))}
        
        

        <Button color="primary" size="large_user" children={"로그인"} onClick={handleSubmit} />
        <Button color="kakao" size="large_user" >
          <s.KakaoImg src={kakaoIcon} alt="카카오 아이콘" />
          카카오 로그인
        </Button>

        <s.Links>
          <s.LinksText>아이디 찾기</s.LinksText> | <s.LinksText>비밀번호 찾기</s.LinksText>
        </s.Links>

        <s.SignUp>
          <s.SignUpText>아직 회원이 아닌가요?</s.SignUpText>
          <s.GoToSignUP onClick={() => navigate("/signup")}>회원가입</s.GoToSignUP>
        </s.SignUp>
      </s.Form>
    </s.Container>
  );
};

export default Login;
