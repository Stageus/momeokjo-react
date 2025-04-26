// 원래 모든 코드 파일은 1개의 목적을 가지도록 짜야 함

// 이 파일의 최종 목표는 true / false 반환해주는 것이 되어야 함

// const getValue = (ref) => (ref?.current?.value !== undefined ? ref.current.value : null)

const validateInput = (ref, regx) => {

  // if (ref) {
    const value = ref?.current?.value !== undefined ? ref.current.value : null

    if (!value) {
      return false
    }
    return !regx.test(value) ? false : true

    


    // if (value) {
    //   return !regx.test(value) ? false : true
    // } else {
    //   return false
    // }
  // }

  // if (refList) {
  //   for (let index=0; index < refList.size; index++) {
  //     const value = getValue(refList[index])
  //     if (value) {
  //       if (!regx.test(refList[index])) {
  //         return false
  //       }
  //     } else {
  //       return false
  //     }
  //   }

  //   return true
  // }
}

// const useValidatorInput = (refOrRefs, validateFn, errorMessage) => {
//   return () => {
//     const getValue = (ref) => (ref?.current?.value !== undefined ? ref.current.value : "")

//     const values = Array.isArray(refOrRefs)
//       ? refOrRefs.map(getValue)
//       : getValue(refOrRefs)

//     return validateFn(values) ? null : errorMessage
//   }
// }

export default validateInput
