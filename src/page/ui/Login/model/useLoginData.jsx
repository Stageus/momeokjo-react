import useValidation from "./useValidation"

function useLoginData() {

  const { refs, errors, handleSubmit } = useValidation("login")

  const inputFields = [
    {
      label: "아이디",
      type: "text",
      refName: "idRef",
      error: errors.id,
    },
    {
      label: "비밀번호",
      type: "password",
      refName: "passwordRef",
      error: errors.password,
    }
  ]

  return { inputFields, handleSubmit, refs }
}

export default useLoginData

