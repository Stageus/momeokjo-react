const useValidatorInput = (ref, regx) => {
  
    const value = ref?.current?.value !== undefined ? ref.current.value : null

    if (!value) {
      return false
    }
    return !regx.test(value) ? false : true
}

export default useValidatorInput
