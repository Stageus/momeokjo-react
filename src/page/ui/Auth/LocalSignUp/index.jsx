import React from "react";
import { useNavigate } from "react-router-dom";
import useSignUpForm from "./model/useSignupForm";
import Button from "../../../../shared/ui/Button";
import SignUpForm from "../../../../widget/SignUpForm";


const LocalSignUp = () => {

  const navigate = useNavigate()
  const {
    errors,
    values,
    handleChange,
    isEmailCodeSent,
    emailCodeMessage,
    isEmailSuccessful,
    handleSendEmailCode,
    handleConfirmEmailCode,
    formatTime,
    timer,
    expireMessage,
    messages,
    signUpInputFields,
    handleSignUp,
  } = useSignUpForm(navigate)

  const submitButton = (
    <Button $signup type="button" color="primary" size="largeUser" onClick={handleSignUp} children={"회원가입"} />
  )

  return (
    <SignUpForm 
      headerTitle="회원가입"
      backNavigation={() => navigate("/login")}
      inputFields={signUpInputFields}
      errors={errors}
      values={values}
      handleChange={handleChange}
      submitButton={submitButton}
      isEmailCodeSent={isEmailCodeSent}
      emailCodeMessage={emailCodeMessage}
      isEmailSuccessful={isEmailSuccessful}
      handleSendEmailCode={handleSendEmailCode}
      handleConfirmEmailCode={handleConfirmEmailCode}
      formatTime={formatTime}
      timer={timer}
      expireMessage={expireMessage}
      messages={messages}
    />
  )
}

export default LocalSignUp;