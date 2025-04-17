const useValidatorInput = (refOrRefs, validateFn, errorMessage) => {
  return () => {
    const getValue = (ref) => (ref?.current?.value !== undefined ? ref.current.value : "")

    const values = Array.isArray(refOrRefs)
      ? refOrRefs.map(getValue)
      : getValue(refOrRefs)

    return validateFn(values) ? null : errorMessage
  }
}

export default useValidatorInput
