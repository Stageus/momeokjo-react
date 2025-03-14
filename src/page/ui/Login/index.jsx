import s from "./style"
import {Button} from "../../../widget/ui/Button"

const Login = () => {
  return (
    <s.Container>
      <s.Title>로그인</s.Title>
      <s.Form>
        <s.Label>아이디 *</s.Label>
        <s.Input type="text" placeholder="아이디를 입력해주세요" />

        <s.Label>비밀번호 *</s.Label>
        <s.Input type="password" placeholder="비밀번호를 입력해주세요" />

        <Button variant="primary" size="large">로그인</Button>
        <Button variant="kakao" size="large">
          <span>💬</span> 카카오 로그인
        </Button>

        <s.Links>
          <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
        </s.Links>

        <s.SignUp>
          아직 회원이 아닌가요? <a href="#">회원가입</a>
        </s.SignUp>
      </s.Form>
    </s.Container>
  );
};

export default Login;
